import path from 'path';
import { Subject } from 'rxjs';

import { Driver } from '../driver';
import { Provider } from '../provider';
import { Context, ContextImpl, Progress, Rule } from '../rule';
import { Settings } from '../settings';
import { Website } from '../website';

export class Validator {
  private readonly context: Context;
  readonly progress$: Subject<Progress>;

  constructor(
    readonly settings: Settings,
    readonly driver: Driver,
    readonly rules: Rule[],
    readonly provider: Provider,
  ) {
    this.context = new ContextImpl(settings, driver, rules, provider);
    this.progress$ = this.context.progress$;
  }

  async capture(url: string) {
    const { screenshotDir } = this.settings;

    await this.driver.open(url);
    const screenshot = await this.driver.takeScreenshotForPage({
      type: 'png',
      path: path.join(screenshotDir, Date.now().toString()),
    });

    const website: Website = {
      title: 'idk',
      url: 'idk',
      screenshot,
    };

    return website;
  }

  private async before(url: string) {
    const { delay } = this.settings;

    // Open page
    await this.driver.open(url);

    // Load gateway libs
    const gateway = path.resolve(__dirname, '../gateway/index.js');
    await this.driver.addScript({ path: gateway });
    await this.driver.waitForFunction('() => visible != null');

    if (delay != null) {
      await this.driver.waitFor(delay);
    }
  }

  private async after() {
    await this.driver.close();
  }

  async diagnose(url: string) {
    await this.before(url);

    for (const rule of this.rules) {
      await rule.create(this.context);
    }

    await this.after();
    return [...this.driver.sources.values()];
  }
}
