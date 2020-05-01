import { Resolvers } from '../generated/graphql';
import * as diagnosis from './diagnoses';
import * as pointer from './pointer';

export const resolvers: Resolvers = {
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
  Pointer: {
    __resolveType: pointer.resolveType,
  },
};
