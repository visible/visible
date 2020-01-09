import { Resolvers } from '../generated/graphql';
import {
  rootDiagnosis,
  createDiagnosis,
  deleteDiagnosis,
  reports,
} from './diagnoses';

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
