// import { promises as fs } from 'fs';
import puppeteer, { Page } from 'puppeteer';
import { Context } from './domain/context';
import { Fixers } from './domain/fixers';
import { Plugin } from './domain/plugin';
import { Rule, RuleConstructor } from './domain/rule';
import { Config } from './domain/config';
import { Report } from './domain/report';
// import { createI18n } from './utils/i18n';
import { runnable } from './utils/runnable';

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

  private async getConfig(baseConfig: Config): Promise<Config> {
    const extendables: Config[] = [];

    for (const extendable of baseConfig.extends) {
      const config = await import(require.resolve(extendable));
      extendables.push(config);
    }

    return [...extendables, baseConfig].reduce((result, config) => {
      return { ...result, ...config };
    }, {} as Config);
  }

  private async loadPlugins(paths: Config['plugins']): Promise<Plugin[]> {
    const plugins: Plugin[] = [];

    for (const path of paths) {
      const plugin = require(path).default;
      plugins.push(plugin);
    }

    return plugins;
  }

  private async runRuleOnPage(
    Rule: RuleConstructor,
    page: Page,
  ): Promise<Report[]> {
    const reports = await await page.evaluate(
      runnable((context: Context) => {
        const rule = new Rule(context);
        return rule.audit();
      }),
      // eslint-disable-next-line @typescript-eslint/ban-ts-ignore
      // @ts-ignore
      { t: (a: string) => a },
    );
    return reports as Report[];
  }

  async diagnose() {
    const browser = await puppeteer.launch();
    const page = await browser.newPage();

    // const [, _t] = await createI18n();
    const config = await this.getConfig(this.params.config);
    const plugins = await this.loadPlugins(config.plugins);

    // // inject everything
    // for (const plugin of plugins) {
    //   page.addScriptTag({ content: plugin });
    // }

    const rules = plugins
      .map(plugin => plugin.rules)
      .reduce<RuleConstructor[]>((acc, cur) => [...acc, ...cur], [])
      .filter(rule => Object.keys(config.rules).includes(rule.meta.name));

    const reports: Report[] = [];

    for (const rule of rules) {
      // console.log(report);
      const report = await this.runRuleOnPage(rule, page);
      reports.push(...report);
    }

    await page.close();
    await browser.close();

    return reports;
  }
}

export const visible = (params: VisibleParams) => {
  return new Visible(params).diagnose();
};
