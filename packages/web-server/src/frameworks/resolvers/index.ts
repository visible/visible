import { Resolvers } from '../generated/graphql';
import {
  createDiagnosis,
  deleteDiagnosis,
  reports,
  rootDiagnosis,
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
