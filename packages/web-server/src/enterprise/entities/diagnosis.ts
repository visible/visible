import { Report, ReportType } from './report';

export class Diagnosis {
  constructor(
    readonly id: string,
    readonly reports: Report[],
    readonly createdAt: Date,
    readonly updatedAt: Date,
  ) {}

  getScore = () => {
    return {
      ok: this.reports.filter(report => report.type === ReportType.OK).length,
      warn: this.reports.filter(report => report.type === ReportType.WARN)
        .length,
      error: this.reports.filter(report => report.type === ReportType.ERROR)
        .length,
    };
  };
}
