import {
  QueryResolvers,
  MutationResolvers,
  DiagnosisResolvers,
  SubscriptionResolvers,
} from '../generated/graphql';

export const rootDiagnosis: QueryResolvers['diagnosis'] = async (
  _,
  { id },
  { diagnosisLoader },
) => {
  const diagnosis = await diagnosisLoader.load(id);
  return diagnosis;
};

export const reports: DiagnosisResolvers['reports'] = (
  parent,
  _,
  { reportsController },
) => {
  if (parent.id) {
    return reportsController.findByDiagnosisId(parent.id);
  }

  throw new Error('Diagnosis should provide id');
};

export const createDiagnosis: MutationResolvers['createDiagnosis'] = async (
  _,
  { url },
  { diagnosisContorller },
) => {
  const diagnosis = await diagnosisContorller.create(url);
  return diagnosis;
};

export const deleteDiagnosis: MutationResolvers['deleteDiagnosis'] = async (
  _,
  { id },
  { diagnosisContorller },
) => {
  const result = await diagnosisContorller.delete(id);
  return result;
};

export const subscriptions: SubscriptionResolvers = {
  diagnosisProgress: {
    subscribe(_, { id: _id }) {
      throw Error('undef');
    },
  },
};
