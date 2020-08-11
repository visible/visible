import path from 'path';
import { Subject } from 'rxjs';

import { Driver, Session } from '../driver';
import { Provider } from '../provider';
import { ContextImpl, Progress, Rule } from '../rule';
import { Settings } from '../settings';
import { Source } from '../source';

export class Validator {
  readonly progress$ = new Subject<Progress>();

  constructor(
    readonly settings: Settings,
    readonly driver: Driver,
    readonly rules: Rule[],
    readonly provider: Provider,
  ) {}

  async diagnose(url: string): Promise<Source[]> {
    const { delay } = this.settings;

    const session = await this.createSessionForURL(url);
    await this.exposeGateway(session);
    const context = this.createContext(session);

    // Wait for delay
    if (delay != null) {
      await session.waitFor(delay);
    }

    // Run rules
    for (const rule of this.rules) {
      await rule.create(context);
    }

    // Done
    await session.close();

    return [...session.sources.values()];
  }

  private async createSessionForURL(url: string) {
    const session = await this.driver.open();
    await session.goto(url);
    return session;
  }

  private async exposeGateway(session: Session) {
    const gateway = path.resolve(__dirname, '../gateway/index.js');
    await session.addScript({ path: gateway });
    await session.waitForFunction('() => visible != null');
  }

  private createContext(session: Session) {
    const context = new ContextImpl(
      this.settings,
      session,
      this.rules,
      this.provider,
    );
    context.progress$.subscribe((progress) => this.progress$.next(progress));
    return context;
  }
}
