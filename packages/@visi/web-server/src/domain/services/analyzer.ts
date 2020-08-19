import { Observable } from 'rxjs';

import { Progress, Website } from '../models';

export interface CaptureParams {
  url: string;
}

export interface ValidateParams {
  url: string;
  diagnosisId: string;
}

export interface Analyzer {
  capture(options: CaptureParams): Promise<Website>;
  validate(options: ValidateParams): Observable<Progress>;
}
