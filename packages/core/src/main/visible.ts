import { i18n } from 'i18next';
import path from 'path';
import { from } from 'rxjs';
import {
  concatMap,
  count,
  map,
  mergeAll,
  withLatestFrom,
} from 'rxjs/operators';

import { Config } from '../shared/config';
import { Report, ReportProgress } from '../shared/report';
import { Browser } from './browser';
import { resolveExtends } from './config';
import { i18next, initI18next } from './i18next';
import { Serializable, serialize as s } from './serialize';

export interface VisibleParams {
  readonly config: Config;
  readonly url: string;
}

export class Visible {
  private constructor(
    private readonly url: string,
    private readonly config: Config,
    private readonly browser: Browser,
    private readonly i18next: i18n,
  ) {}

  static async init(params: VisibleParams, browser: Browser) {
    await initI18next(params.config?.settings?.language ?? 'en');

    const visible = new Visible(
      params.url,
      resolveExtends(params.config),
      browser,
      i18next,
    );

    await visible.browser.setup(visible.config.settings);
    await visible.browser.openURL(visible.url);
    await visible.browser.serveModule();
    await visible.expose();

    return visible;
  }

  async cleanup() {
    return await this.browser.cleanup();
  }

  private async expose() {
    // Bind to itself context so that we can invoke without `this`
    const t = this.i18next.t.bind(i18next);
    const addTranslations = this.i18next.addResourceBundle.bind(i18next);

    // Browser -> Node.js
    await this.browser.declare({
      __VISIBLE_CONFIG__: this.config as Serializable,
      __VISIBLE_PLUGINS__: [],
      __VISIBLE_T__: t,
      __VISIBLE_ADD_TRANSLATIONS__: addTranslations,
    });

    // Node.js -> Browser
    await this.browser
      .addScriptTag({
        path: path.resolve(__dirname, '../embed/index.js'),
      })
      .then(() =>
        this.browser.waitFor('() => __VISIBLE_EMBED__ !== undefined'),
      );

    // Tell the browser that Node.js process is now ready
    // so they starts setups such as loading plugins
    await this.browser.run('__VISIBLE_EMBED__.onReady()');
  }

  /**
   * Diagnose the page
   */
  diagnose() {
    const rules$ = from(
      this.browser.run<string[]>('__VISIBLE_EMBED__.listRules()'),
    ).pipe(mergeAll());

    return rules$.pipe(
      concatMap(name =>
        this.browser.run<Report[]>(s`__VISIBLE_EMBED__.processRule(${name})`),
      ),
      withLatestFrom(rules$.pipe(count())),
      map(
        ([reports, totalCount], i): ReportProgress => ({
          reports,
          totalCount,
          doneCount: i + 1,
        }),
      ),
    );
  }
}
