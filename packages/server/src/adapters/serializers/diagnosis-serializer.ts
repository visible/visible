import { PartialDeep } from 'type-fest';
import {
  Diagnosis,
  DiagnosisStatus,
} from '../../enterprise/entities/diagnosis';
import { ReportSerializer, ReportAPI } from './report-serializer';

export type ScoreAPI = PartialDeep<{
  error: number;
  warn: number;
  ok: number;
}>;

export enum DiagnosisStatusAPI {
  STARTED = 'STARTED',
  RUNNING = 'RUNNING',
  DONE = 'DONE',
  FAILED = 'FAILED',
}

export type DiagnosisAPI = PartialDeep<{
  id: string;
  screenshot: string;
  doneRulesCount: number;
  totalRulesCount: number;
  score: ScoreAPI;
  status: DiagnosisStatusAPI;
  reports: ReportAPI[];
}>;

export class DiagnosisSerializer {
  private mapStatus = (status: DiagnosisStatus) => {
    switch (status) {
      case DiagnosisStatus.STARTED:
        return DiagnosisStatusAPI.STARTED;
      case DiagnosisStatus.RUNNING:
        return DiagnosisStatusAPI.RUNNING;
      case DiagnosisStatus.DONE:
        return DiagnosisStatusAPI.DONE;
      case DiagnosisStatus.FAILED:
      default:
        return DiagnosisStatusAPI.FAILED;
    }
  };

  transformOne(diagnosis: Diagnosis): DiagnosisAPI {
    return {
      id: diagnosis.id,
      score: diagnosis.getScore(),
      reports: new ReportSerializer().serialize(diagnosis.reports),
      status: this.mapStatus(diagnosis.status),
      screenshot: '',
      doneRulesCount: diagnosis.doneRulesCount,
      totalRulesCount: diagnosis.totalRulesCount,
      // website: new WebsiteSerializer().serialize(diagnosis.website),
    };
  }

  transform(diagnoses: Diagnosis[]): DiagnosisAPI[] {
    return diagnoses.map(diagnosis => this.transformOne(diagnosis));
  }
}
