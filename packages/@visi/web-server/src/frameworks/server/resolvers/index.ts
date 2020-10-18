// import { resolvers as scalars } from 'graphql-scalars';

import { Resolvers } from '../generated/graphql';
import * as diagnosis from './diagnoses';
import * as report from './report';
import * as stats from './stats';

export const resolvers: Resolvers = {
  // URL: scalars.URL,
  // Date: scalars.Date,
  Query: {
    diagnosis: diagnosis.rootDiagnosis,
    stats: stats.rootStats,
  },
  Mutation: {
    createDiagnosis: diagnosis.createDiagnosis,
    deleteDiagnosis: diagnosis.deleteDiagnosis,
  },
  Subscription: {
    diagnosis: diagnosis.diagnosisSubscription,
    stats: stats.statsSubscription,
  },
  Report: {
    rule: report.reportRule,
  },
};
