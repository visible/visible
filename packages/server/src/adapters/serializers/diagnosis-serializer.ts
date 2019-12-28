import { Diagnosis, DiagnosisAPI } from '../../enterprise/entities/diagnosis';
import { Report } from '../../enterprise/entities/report';

import { DiagnosisOutput } from '../../application/outputs/diagnosis-output';

import { ReportSerializer } from './report-serializer';
// import { WebsiteSerializer } from './website-serializer';

export class DiagnosisSerializer implements DiagnosisOutput<DiagnosisAPI> {
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
