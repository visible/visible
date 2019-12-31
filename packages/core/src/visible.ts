import puppeteer, { Page } from 'puppeteer';
import { Fixers } from './domain/fixers';
import { Plugin } from './domain/plugin';
import { Rule } from './domain/rule';
import { Config } from './domain/config';

export interface VisibleParams {
  readonly config: Config;
  readonly url?: string;
  readonly html?: string;
  readonly language?: string;
  readonly rules?: Rule[];
  readonly fixers?: Fixers;
}

export class Visible {
  constructor(private readonly params: VisibleParams) {}

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
   *
   * @param page Page instance
   * @param path path to the plugin
   * @param name name of the plugin
   */
  private registerPlugin(page: Page, path: string, name: string) {
    page.addScriptTag({ path });

    page.evaluate((name: string) => {
      if (!(window as any).pluginNames) {
        (window as any).pluginNames = [];
      }

      (window as any).pluginNames.push(name);
    }, name);
  }

  /**
   * Find rules from window, and execute them
   *
   * TODO: Add config reader on the browser side...?
   * cuz we cant resolve the structure of a module on the Node.js side
   */
  private runRules = (page: Page) =>
    page.evaluate(() => {
      // Find plugins
      const { pluginNames } = window as any;
      const plugins: Plugin[] = [];

      for (const name of pluginNames) {
        plugins.push((window as any)[name]);
      }

      // macro
      const flatten = <T>(ar: T[][]) =>
        ar.reduce<T[]>((a, c) => [...a, ...c], []);

      // Find rules
      const rules = flatten(plugins.map(plugin => plugin.rules));

      return Promise.all(
        rules.map(Rule => {
          const rule = new Rule({
            // We might can use `exposeFucntion` here?
            // since we don't need an access to the DOM from that side...
            t: (k: string) => k,
          });

          return rule.audit();
        }),
      ).then(reports => flatten(reports));
    });

  /**
   * Diagnose the page
   */
  async diagnose() {
    const browser = await puppeteer.launch();
    const page = await browser.newPage();
    await page.goto(this.params.url ?? '');

    const config = await this.mergeExtends(this.params.config);

    for (const plugin of config.plugins) {
      this.registerPlugin(page, require.resolve(plugin), plugin);
    }

    await page.waitFor(1000);

    const reports = await this.runRules(page);

    await page.close();
    await browser.close();

    return reports;
  }
}

export const visible = (params: VisibleParams) => {
  return new Visible(params).diagnose();
};
