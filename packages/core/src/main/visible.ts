import { i18n, TFunction } from 'i18next';
import path from 'path';

import { Config } from '../shared/config';
import { Report } from '../shared/report';
import { Browser } from './browser';
import { resolveExtends } from './config';
import { createI18n } from './i18n';
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
    private readonly t: TFunction,
  ) {}

  static async init(params: VisibleParams, browser: Browser) {
    const [i18next, t] = await createI18n();

    return new Visible(
      params.url,
      resolveExtends(params.config),
      browser,
      i18next,
      t,
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
    await this.browser.exposeFunction('__VISIBLE_I18NEXT_ADD_RESOURCES__', this.i18next.addResources);
    await this.browser.exposeFunction('__VISIBLE_I18NEXT_T__', this.t);
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
