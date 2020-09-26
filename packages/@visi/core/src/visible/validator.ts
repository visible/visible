import path from 'path';
import { defer, from, Observable } from 'rxjs';
import {
  concatMap,
  finalize,
  mergeAll,
  publish,
  refCount,
} from 'rxjs/operators';

import { Driver, Session } from '../driver';
import { Provider } from '../provider';
import { ContextImpl, Progress, Rule } from '../rule';
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

      if (delay != null) {
        await session.waitFor(delay);
      }

      return this.runRules(session);
    }).pipe(mergeAll(), publish(), refCount());
  }

  private async runRules(session: Session) {
    return from(this.rules).pipe(
      concatMap((rule, i) =>
        defer(
          async (): Promise<Progress> => {
            const context = this.createContext(session, rule.id);

            try {
              await rule.create(context);
            } catch {
              await context.reportHTML({
                outcome: Outcome.INAPPLICABLE,
                target: '/html',
              });
            }

            return {
              doneCount: i + 1,
              totalCount: this.rules.length,
              sources: session.sources,
            };
          },
        ),
      ),
      finalize(() => void session.close()),
    );
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

  private createContext(session: Session, ruleId: string) {
    return new ContextImpl(
      ruleId,
      this.settings,
      session,
      this.rules,
      this.provider,
    );
  }
}
