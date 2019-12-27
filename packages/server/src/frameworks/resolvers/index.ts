import { Resolvers } from '../generated/graphql';
import { rootDiagnosis, createDiagnosis, deleteDiagnosis } from './diagnosises';

export const resolvers: Resolvers = {
  Query: {
    diagnosis: rootDiagnosis,
  },
  Mutation: {
    createDiagnosis,
    deleteDiagnosis,
  },
};
