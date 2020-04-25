import { PartialDeep } from 'type-fest';

import { Diagnosis } from '../../domain/models/diagnosis';
import { ReportAPI, ReportSerializer } from './report-serializer';

export type ScoreAPI = PartialDeep<{
  error: number;
  warn: number;
  ok: number;
}>;

export type DiagnosisAPI = PartialDeep<{
  id: string;
  score: ScoreAPI;
  screenshot: string;
  reports: ReportAPI[];
}>;

export class DiagnosisSerializer {
  transformOne(diagnosis: Diagnosis): DiagnosisAPI {
    return {
      id: diagnosis.id,
      screenshot: '',
      score: diagnosis.getScore(),
      reports: new ReportSerializer().serialize(diagnosis.reports),
      // website: new WebsiteSerializer().serialize(diagnosis.website),
    };
  }

  transform(diagnoses: Diagnosis[]): DiagnosisAPI[] {
    return diagnoses.map(diagnosis => this.transformOne(diagnosis));
  }
}
