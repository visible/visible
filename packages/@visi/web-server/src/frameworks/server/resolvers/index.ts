import { resolvers as Scalars } from 'graphql-scalars';

import { Resolvers } from '../generated/graphql';
import * as diagnosis from './diagnoses';

export const resolvers: Resolvers = {
  URL: Scalars.URL,
  Date: Scalars.Date,
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
};
