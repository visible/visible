import { i18n } from 'i18next';
import path from 'path';

import { Config } from '../shared/config';
import { Report } from '../shared/report';
import { Browser } from './browser';
import { resolveExtends } from './config';
import { i18next, initI18next } from './i18next';
import { serialize } from './serialize';

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

    return new Visible(
      params.url,
      resolveExtends(params.config),
      browser,
      i18next,
    );
  }

  /**
   * Diagnose the page
   */
  async diagnose() {
    await this.browser.setup(this.config.settings);
    await this.browser.openURL(this.url);
    await this.browser.serveModule();
    await this.embed();
    await this.browser.waitFor(1000);
    const reports = await this.runRules();
    await this.browser.waitFor(1000);
    await this.browser.cleanup();

    return reports;
  }

  // prettier-ignore
  private async embed() {
    await this.browser.addScriptTag({ path: path.resolve(__dirname, '../embed/index.js') });
    await this.browser.addScriptTag({ content: serialize`__VISIBLE_CONFIG__ = ${this.config};`});
    await this.browser.exposeFunction('__VISIBLE_I18NEXT_ADD_RESOURCES__', this.i18next.addResourceBundle.bind(i18next));
    await this.browser.exposeFunction('__VISIBLE_I18NEXT_T__', this.i18next.t.bind(i18next));
  }

  /**
   * Find rules from window, and execute them
   */
  // prettier-ignore
  private async runRules() {
    const pluginNames = this.config.plugins ?? [];
    return this.browser.run<Report[]>(serialize`__VISIBLE_EMBED__.runRule(${pluginNames})`);
  }
}
