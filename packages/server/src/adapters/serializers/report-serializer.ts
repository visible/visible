import {
  ReportType,
  Report,
  ReportAPI,
  ReportTypeAPI,
} from '../../enterprise/entities/report';

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
