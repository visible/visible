import path from 'path';
import { defer, Observable } from 'rxjs';
import { flatMap, publish, refCount } from 'rxjs/operators';

import { Driver, Session } from '../driver';
import { Provider } from '../provider';
import { Context, ContextImpl, Progress, Rule } from '../rule';
import { Settings } from '../settings';
import { Outcome } from '../source';

export class Validator {
  constructor(
    readonly settings: Settings,
    readonly driver: Driver,
    readonly rules: Rule[],
    readonly provider: Provider,
  ) {}

  diagnose(url: string): Observable<Progress> {
    const { delay } = this.settings;

    return defer(async () => {
      const session = await this.createSessionForURL(url);
      await this.exposeGateway(session);
      const context = this.createContext(session);

      if (delay != null) {
        await session.waitFor(delay);
      }

      this.runRules(session, context).catch((error) => {
        context.progress$.error(error);
      });

      return context;
    }).pipe(
      flatMap((context) => context.progress$),
      publish(),
      refCount(),
    );
  }

  private async runRules(session: Session, context: Context) {
    for (const rule of this.rules) {
      try {
        await rule.create(context);
      } catch {
        await context.reportHTML({
          outcome: Outcome.INAPPLICABLE,
          target: '/html',
          ruleId: rule.id,
        });
      }
    }

    context.progress$.complete();
    await session.close();
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
    return new ContextImpl(this.settings, session, this.rules, this.provider);
  }
}
