import { inject, injectable } from 'inversify';
import { defer, from, Observable } from 'rxjs';
import { concatMap, finalize, mergeAll } from 'rxjs/operators';

import { Progress, Website } from '../../../domain/models';
import {
  Analyzer,
  CaptureParams,
  ValidateParams,
} from '../../../domain/services';
import { TYPES } from '../../../types';
import { Translator, TranslatorImpl } from './translator';
import { VisiblePool } from './visible-pool';

@injectable()
export class AnalyzerVisibleImpl implements Analyzer {
  constructor(
    @inject(TranslatorImpl)
    private readonly translator: Translator,

    @inject(TYPES.VisiblePool)
    private readonly visiblePool: VisiblePool,
  ) {}

  async capture({ url }: CaptureParams): Promise<Website> {
    const visible = await this.visiblePool.acquire();

    try {
      const data = await visible.capture(url);
      const website = await this.translator.createWebsite(data);
      return website;
    } finally {
      await this.visiblePool.release(visible);
    }
  }

  validate({ url, diagnosisId }: ValidateParams): Observable<Progress> {
    return defer(async () => {
      const visible = await this.visiblePool.acquire();

      return visible.diagnose({ url }).pipe(
        concatMap((progress) =>
          from(this.translator.createProgress(progress, diagnosisId)),
        ),
        finalize(() => {
          this.visiblePool.release(visible);
        }),
      );
    }).pipe(mergeAll());
  }
}
