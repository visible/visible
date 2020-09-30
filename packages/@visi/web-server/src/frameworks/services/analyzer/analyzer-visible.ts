import { Visible } from '@visi/core';
import { inject, injectable } from 'inversify';
import { from, Observable } from 'rxjs';
import { concatMap } from 'rxjs/operators';

import { Progress, Website } from '../../../domain/models';
import {
  Analyzer,
  CaptureParams,
  ValidateParams,
} from '../../../domain/services';
import { TYPES } from '../../../types';
import { Translator, TranslatorImpl } from './translator';

@injectable()
export class AnalyzerVisibleImpl implements Analyzer {
  constructor(
    @inject(TYPES.Visible)
    private readonly visible: Visible,

    @inject(TranslatorImpl)
    private readonly translator: Translator,
  ) {}

  async capture({ url }: CaptureParams): Promise<Website> {
    const website = await this.visible.capture(url);
    return this.translator.createWebsite(website);
  }

  validate({ url, diagnosisId }: ValidateParams): Observable<Progress> {
    return this.visible
      .diagnose({ url })
      .pipe(
        concatMap((progress) =>
          from(this.translator.createProgress(progress, diagnosisId)),
        ),
      );
  }
}
