import {
  ReportType,
  Report,
  ReportAPI,
  ReportTypeAPI,
} from '../../domain/entities/report';

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
  return reports.map((report, i) => ({
    __typename: 'Report',
    id: `${report.id}-${i}`,
    type: serializeType(report.type),
    message: report.message,
    content: {
      __typename: 'Content',
      html: report.content && report.content.html,
      xpath: report.content && report.content.xpath,
      css: report.content && report.content.css,
    },
  }));
};

export class ReportSerializer {
  serialize(reports: Report[]) {
    return serialize(reports);
  }
}
