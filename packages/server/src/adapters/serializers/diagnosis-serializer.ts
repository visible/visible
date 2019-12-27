import { PartialDeep } from 'type-fest';

import { Diagnosis, DiagnosisAPI } from '../../domain/entities/diagnosis';
import { Report } from '../../domain/entities/report';

import { ReportSerializer } from './report-serializer';
import { WebsiteSerializer } from './website-serializer';

export class DiagnosisSerializer {
  private calculateScore(reports: Report[]) {
    return {
      ok: reports.filter(report => report.type === 'ok').length,
      warn: reports.filter(report => report.type === 'warn').length,
      error: reports.filter(report => report.type === 'error').length,
    };
  }

  serialize(diagnosis: Diagnosis): PartialDeep<DiagnosisAPI> {
    return {
      id: diagnosis.id,
      website: new WebsiteSerializer().serialize(diagnosis.website),
      screenshot: '',
      score: this.calculateScore(diagnosis.reports),
      reports: new ReportSerializer().serialize(diagnosis.reports),
    };
  }
}
