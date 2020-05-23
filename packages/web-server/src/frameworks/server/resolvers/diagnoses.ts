import {
  MutationResolvers,
  QueryResolvers,
  SubscriptionResolvers,
} from '../generated/graphql';

export const rootDiagnosis: QueryResolvers['diagnosis'] = async (
  _,
  { id },
  { diagnosisController },
) => {
  const diagnosis = await diagnosisController.load(id);
  return diagnosis;
};

export const createDiagnosis: MutationResolvers['createDiagnosis'] = async (
  _,
  { url },
  { diagnosisController },
) => {
  const diagnosis = await diagnosisController.create(url);
  return diagnosis;
};

export const deleteDiagnosis: MutationResolvers['deleteDiagnosis'] = async (
  _,
  { id },
  { diagnosisController },
) => {
  return diagnosisController.delete(id);
};

export const diagnosisSubscription: SubscriptionResolvers['diagnosis'] = {
  subscribe(_, { id }, { diagnosisController }) {
    return diagnosisController.subscribe(id);
  },
};
