import {
  MutationResolvers,
  QueryResolvers,
  SubscriptionResolvers,
} from '../generated/graphql';

export const rootDiagnosis: QueryResolvers['diagnosis'] = (
  _,
  { id },
  { diagnosisLoader },
) => {
  return diagnosisLoader.load(id);
};

export const createDiagnosis: MutationResolvers['createDiagnosis'] = (
  _,
  { url },
  { diagnosisController },
) => {
  return diagnosisController.create(url);
};

export const deleteDiagnosis: MutationResolvers['deleteDiagnosis'] = (
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
