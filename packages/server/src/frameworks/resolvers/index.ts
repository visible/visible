import { Resolvers } from '../generated/graphql';
import {
  rootDiagnosis,
  createDiagnosis,
  deleteDiagnosis,
  reports,
} from './diagnosises';

export const resolvers: Resolvers = {
  Query: {
    diagnosis: rootDiagnosis,
  },
  Mutation: {
    createDiagnosis,
    deleteDiagnosis,
  },
  Diagnosis: {
    reports,
  },
};
