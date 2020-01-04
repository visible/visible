import fs from 'fs';
import path from 'path';
import { Browser } from './domain/browser';
import { Config } from './domain/config';
import { resolveExtends } from './utils/config';

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
    await this.browser.waitFor(1000);

    const reports = await this.runRules();
    await this.browser.waitFor(1000);
    await this.browser.cleanup();

    return reports;
  }

  /**
   * Find rules from window, and execute them
   */
  private async runRules() {
    const pluginNames = this.config.plugins ?? [];

    // prettier-ignore
    return this.browser.run(`(async () => {
      const plugins = [];

      for (const name of JSON.parse('${JSON.stringify(pluginNames)}')) {
        const plugin = await import('./main_process/' + name);
        plugins.push(plugin.default);
      }

      const flatten = ar => ar.reduce((a, c) => [...a, ...c], []);
      const rules = flatten(plugins.map(plugin => plugin.rules));

      const reports = await Promise.all(rules.map(Rule => {
        const rule = new Rule({
          t: (k) => k,
        });

        return rule.audit();
      }));

      return flatten(reports);
    })()` as any, []);
  }
}
