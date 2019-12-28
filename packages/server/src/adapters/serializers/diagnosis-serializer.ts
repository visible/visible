import { PartialDeep } from 'type-fest';

import { Diagnosis } from '../../enterprise/entities/diagnosis';
import { Report } from '../../enterprise/entities/report';

import { ReportSerializer, ReportAPI } from './report-serializer';

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

  transform(diagnosises: Diagnosis[]): DiagnosisAPI[] {
    return diagnosises.map(diagnosis => this.transformOne(diagnosis));
  }
}
