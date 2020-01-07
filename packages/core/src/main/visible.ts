import fs from 'fs';
import path from 'path';
import { Config } from '../shared/config';
import { Report } from '../shared/report';
import { Browser } from './browser';
import { resolveExtends } from './config';

export interface VisibleParams {
  readonly config: Config;
  readonly url?: string;
  readonly html?: string;
}

export class Visible {
  protected config!: Config;

  constructor(
    private readonly params: VisibleParams,
    private readonly browser: Browser,
  ) {}

  /**
   * Diagnose the page
   */
  async diagnose() {
    const { config: baseConfig } = this.params;

    this.config = resolveExtends(baseConfig);
    console.log(resolveExtends(baseConfig));

    await this.browser.setup({
      language: this.config.settings?.language,
      width: this.config.settings?.width,
      height: this.config.settings?.height,
    });

    // prettier-ignore
    this.browser.registerResolver(/plugins_browser\/(.+?)$/, moduleName => {
      const packageJson = require(path.join(moduleName, 'package.json')) as { browser: string };
      const fullpath = require.resolve(path.join(moduleName, packageJson.browser));
      return fs.readFileSync(fullpath, { encoding: 'utf-8' });
    });

    await this.browser.openURL(this.params.url ?? '');
    await this.injectRuntimeScripts();
    await this.browser.waitFor(1000);

    const reports = await this.runRules();
    await this.browser.waitFor(1000);
    await this.browser.cleanup();

    return reports;
  }

  private async injectRuntimeScripts() {
    await this.browser.addScriptTag({
      path: './embed/run-rule.js',
    });
    await this.browser.addScriptTag({
      content: `
      window.__VISIBLE__.config = JSON.parse('${JSON.stringify(this.config)}');
    `,
    });
    return;
  }

  /**
   * Find rules from window, and execute them
   */
  private async runRules() {
    const pluginNames = this.config.plugins ?? [];

    return this.browser.run<Report[]>(
      `runRule(JSON.parse('${JSON.stringify(pluginNames)}'))`,
    );
  }
}
