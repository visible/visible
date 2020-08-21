// import { resolvers as scalars } from 'graphql-scalars';

import { Resolvers } from '../generated/graphql';
import * as diagnosis from './diagnoses';
import * as report from './report';

export const resolvers: Resolvers = {
  // URL: scalars.URL,
  // Date: scalars.Date,
  Query: {
    diagnosis: diagnosis.rootDiagnosis,
  },
  Mutation: {
    createDiagnosis: diagnosis.createDiagnosis,
    deleteDiagnosis: diagnosis.deleteDiagnosis,
  },
  Subscription: {
    diagnosis: diagnosis.diagnosisSubscription,
  },
  Report: {
    rule: report.reportRule,
  },
};
