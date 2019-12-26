import {
  Report as VisiReport,
  ReportType as VisiReportType,
} from '@visi/core/dist/domain/report';
// FIXME
import { Report, ReportType } from '../../infrastructure/generated/graphql';

const serializeType = (type: VisiReportType): ReportType => {
  switch (type) {
    case 'error':
      return ReportType.Error;
    case 'warn':
      return ReportType.Warn;
    case 'ok':
    default:
      return ReportType.Ok;
  }
};

const serialize = (reports: VisiReport[]): Report[] => {
  return reports.map((report, i) => ({
    id: `${report.id}-${i}`,
    type: serializeType(report.type),
    message: report.message,
    content: {
      html: report.content && report.content.html,
      xpath: report.content && report.content.xpath,
      css: report.content && report.content.style,
    },
  }));
};

export class ReportSerializer {
  async serialize(reports: VisiReport[]) {
    return serialize(reports);
  }
}
