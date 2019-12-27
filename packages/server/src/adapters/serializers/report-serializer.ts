import {
  ReportType,
  Report,
  ReportAPI,
  ReportTypeAPI,
} from '../../enterprise/entities/report';

const serializeType = (type: ReportType): ReportTypeAPI => {
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

const serialize = (reports: Report[]): ReportAPI[] => {
  return reports.map(report => ({
    id: report.id,
    name: report.name,
    type: serializeType(report.type),
    message: report.message,
    content: {
      html: report.html,
      xpath: report.xpath,
      css: report.css,
    },
  }));
};

export class ReportSerializer {
  serialize(reports: Report[]) {
    return serialize(reports);
  }
}
