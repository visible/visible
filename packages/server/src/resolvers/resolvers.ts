import { visible } from '@visi/core';
import {
  Report as VisiReport,
  ReportType as VisiReportType,
} from '@visi/core/dist/domain/report';
import { Resolvers, Report, ReportType } from '../generated/graphql';

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
      html: (report.content && report.content.html) || '',
      xpath: (report.content && report.content.xpath) || '',
      css: (report.content && report.content.style) || '',
    },
  }));
};

export const resolvers: Resolvers = {
  Mutation: {
    diagnoseURL: async (_parent, { url }, _context) => {
      const reports = await visible({ url });

      return {
        id: '1',
        reports: serialize(reports),
      };
    },
  },
};
