import { ReportResolvers } from '../generated/graphql';

export const reportRule: ReportResolvers['rule'] = (
  report,
  _,
  { ruleController },
) => {
  if (report.id == null) {
    throw new Error('report.id is null');
  }

  return ruleController.findByReportId(report.id);
};
