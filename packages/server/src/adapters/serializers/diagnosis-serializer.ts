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
  private calculateScore(reports: Report[]) {
    return {
      ok: reports.filter(report => report.type === 'ok').length,
      warn: reports.filter(report => report.type === 'warn').length,
      error: reports.filter(report => report.type === 'error').length,
    };
  }

  transformOne(diagnosis: Diagnosis): DiagnosisAPI {
    return {
      id: diagnosis.id,
      screenshot: '',
      score: this.calculateScore(diagnosis.reports),
      reports: new ReportSerializer().serialize(diagnosis.reports),
      // website: new WebsiteSerializer().serialize(diagnosis.website),
    };
  }

  transform(diagnosises: Diagnosis[]): DiagnosisAPI[] {
    return diagnosises.map(diagnosis => this.transformOne(diagnosis));
  }
}
