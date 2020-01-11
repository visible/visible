// import { PartialDeep } from 'type-fest';
import { ReportLevel, Report } from '../../enterprise/entities/report';

export enum ReportLevelAPI {
  OK = 'OK',
  WARN = 'WARN',
  ERROR = 'ERROR',
}

export type ReportAPI = {
  id: string;
  name: string;
  level: ReportLevelAPI;
  message?: string;
  xpath?: string;
  css?: string;
  html?: string;
};

export class ReportSerializer {
  private serializeType = (type: ReportLevel): ReportLevelAPI => {
    switch (type) {
      case ReportLevel.ERROR:
        return ReportLevelAPI.ERROR;
      case ReportLevel.WARN:
        return ReportLevelAPI.WARN;
      case ReportLevel.OK:
      default:
        return ReportLevelAPI.OK;
    }
  };

  serializeOne(report: Report): ReportAPI {
    return {
      id: report.id,
      name: report.name,
      level: this.serializeType(report.level),
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
