import { Report, ReportLevel } from './report';

export enum DiagnosisStatus {
  STARTED = 'STARTED',
  RUNNING = 'RUNNING',
  DONE = 'DONE',
  FAILED = 'FAILED',
}

export class Diagnosis {
  constructor(
    readonly id: string,
    readonly status: DiagnosisStatus,
    readonly reports: Report[],
    readonly doneRulesCount: number,
    readonly totalRulesCount: number,
    readonly createdAt: Date,
    readonly updatedAt: Date,
  ) {}

  getScore = () => {
    return {
      ok: this.reports.filter(report => report.level === ReportLevel.OK).length,
      warn: this.reports.filter(report => report.level === ReportLevel.WARN)
        .length,
      error: this.reports.filter(report => report.level === ReportLevel.ERROR)
        .length,
    };
  };
}
