import path from 'path';
import { Config } from '../shared/config';
import { Report } from '../shared/report';
import { Browser } from './browser';
import { resolveExtends } from './config';
import { ModuleResolver } from './module-resolver';

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
    private readonly moduleResolver: ModuleResolver,
  ) {}

  /**
   * Diagnose the page
   */
  async diagnose() {
    const { config: baseConfig } = this.params;

    this.config = resolveExtends(baseConfig);
    this.moduleResolver.start();

    await this.browser.setup(this.config.settings);
    await this.browser.openURL(this.params.url ?? '');
    await this.embed();
    await this.browser.waitFor(1000);
    const reports = await this.runRules();
    await this.browser.waitFor(1000);
    await this.browser.cleanup();

    return reports;
  }

  private async embed() {
    await this.browser.addScriptTag({
      type: 'module',
      path: path.resolve(__dirname, '../embed/run-rule.js'),
    });
    await this.browser.addScriptTag({
      type: 'module',
      content: `
      window.__VISIBLE_CONFIG__ = JSON.parse('${JSON.stringify(this.config)}');
    `,
    });
    return;
  }

  /**
   * Find rules from window, and execute them
   */
  private async runRules() {
    const paths = (this.config.plugins ?? []).map(
      name => 'http://localhost:8080/' + name,
    );

    return this.browser.run<Report[]>(
      `runRule(JSON.parse('${JSON.stringify(paths)}'))`,
    );
  }
}
