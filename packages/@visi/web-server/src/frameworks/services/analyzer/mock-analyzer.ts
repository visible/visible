import { injectable } from 'inversify';
import { Observable, Subject } from 'rxjs';

import { website } from '../../../__fixtures__/website';
import { Progress, Website } from '../../../domain/models';
import {
  Analyzer,
  CaptureParams,
  ValidateParams,
} from '../../../domain/services';

export const stream$ = new Subject<Progress>();

@injectable()
export class MockAnalyzer implements Analyzer {
  stream$ = stream$;

  async capture(_params: CaptureParams): Promise<Website> {
    return website;
  }

  validate(_params: ValidateParams): Observable<Progress> {
    return this.stream$;
  }
}
