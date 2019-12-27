import { PartialDeep } from 'type-fest';

import { Diagnosis, DiagnosisAPI } from '../../enterprise/entities/diagnosis';
import { Report } from '../../enterprise/entities/report';

import { ReportSerializer } from './report-serializer';
// import { WebsiteSerializer } from './website-serializer';

export class DiagnosisSerializer {
  private calculateScore(reports: Report[]) {
    return {
      ok: reports.filter(report => report.type === 'ok').length,
      warn: reports.filter(report => report.type === 'warn').length,
      error: reports.filter(report => report.type === 'error').length,
    };
  }

  serializeOne(diagnosis: Diagnosis): DiagnosisAPI {
    return {
      id: diagnosis.id,
      screenshot: '',
      score: this.calculateScore(diagnosis.reports),
      reports: new ReportSerializer().serialize(diagnosis.reports),
      // website: new WebsiteSerializer().serialize(diagnosis.website),
    };
  }

  serialize(diagnosises: Diagnosis[]): DiagnosisAPI[] {
    return diagnosises.map(diagnosis => this.serializeOne(diagnosis));
  }
}