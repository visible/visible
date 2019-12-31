import { Fixers } from './domain/fixers';
import { Plugin } from './domain/plugin';
import { Rule } from './domain/rule';
import { Config } from './domain/config';
import { Browser } from './domain/browser';
import { BrowserPuppeteerImpl } from './adapters/puppeteer-impl';

export interface VisibleParams {
  readonly config: Config;
  readonly url?: string;
  readonly html?: string;
  readonly language?: string;
  readonly rules?: Rule[];
  readonly fixers?: Fixers;
}

export class Visible {
  constructor(
    private readonly params: VisibleParams,
    private readonly browser: Browser,
  ) {}

  /**
   * Takes config object and reoslve extends
   * @param baseConfig base configuration object
   */
  private async mergeExtends(baseConfig: Config): Promise<Config> {
    const extendables: Config[] = [];

    for (const extendable of baseConfig.extends) {
      const config = await import(require.resolve(extendable));
      extendables.push(config);
    }

    return [...extendables, baseConfig].reduce((result, config) => {
      return { ...result, ...config };
    }, {} as Config);
  }

  /**
   * Find rules from window, and execute them
   *
   * TODO: Add config reader on the browser side...?
   * cuz we cant resolve the structure of a module on the Node.js side
   */
  private async runRules() {
    const pluginNames = await this.browser.getIIFE();

    // prettier-ignore
    return this.browser.run((pluginNames: string[]) => {
      const plugins: Plugin[] = [];

      for (const name of pluginNames) {
        // eslint-disable-next-line @typescript-eslint/no-explicit-any
        plugins.push((window as any)[name]);
      }

      // macro
      const flatten = <T>(ar: T[][]) =>
        ar.reduce<T[]>((a, c) => [...a, ...c], []);

      // Find rules
      const rules = flatten(plugins.map(plugin => plugin.rules));

      return Promise.all(rules.map(Rule => {
        const rule = new Rule({
          // We might can use `exposeFucntion` here?
          // since we don't need an access to the DOM from that side...
          t: (k: string) => k,
        });

        return rule.audit();
      })).then(reports => flatten(reports));
    }, [pluginNames]);
  }

  /**
   * Diagnose the page
   */
  async diagnose() {
    await this.browser.setup();
    await this.browser.openURL(this.params.url ?? '');

    const config = await this.mergeExtends(this.params.config);

    for (const plugin of config.plugins) {
      this.browser.installIIFE(plugin, require.resolve(plugin));
    }

    await this.browser.waitFor(1000);

    const reports = await this.runRules();
    await this.browser.cleanup();

    return reports;
  }
}

export const visible = (params: VisibleParams) => {
  const puppeteer = new BrowserPuppeteerImpl();
  return new Visible(params, puppeteer).diagnose();
};
