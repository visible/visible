import { PartialDeep } from 'type-fest';
import { ReportType, Report } from '../../enterprise/entities/report';

export enum ReportTypeAPI {
  OK = 'OK',
  WARN = 'WARN',
  ERROR = 'ERROR',
}

export type ReportAPI = PartialDeep<{
  id: string;
  name: string;
  type: ReportTypeAPI;
  message?: string;
  xpath?: string;
  css?: string;
  html?: string;
}>;

export class ReportSerializer {
  private serializeType = (type: ReportType): ReportTypeAPI => {
    switch (type) {
      case 'error':
        return ReportTypeAPI.ERROR;
      case 'warn':
        return ReportTypeAPI.WARN;
      case 'ok':
      default:
        return ReportTypeAPI.OK;
    }
  };

  serializeOne(report: Report): ReportAPI {
    return {
      id: report.id,
      name: report.name,
      type: this.serializeType(report.type),
      message: report.message,
      html: report.html,
      xpath: report.xpath,
      css: report.css,
    };
  }

  serialize(reports: Report[]): ReportAPI[] {
    return reports.map(report => this.serializeOne(report));
  }
}
