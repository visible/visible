import { QueryResolvers, MutationResolvers } from '../generated/graphql';

export const rootDiagnosis: QueryResolvers['diagnosis'] = async (
  _,
  { id },
  { loaders },
) => {
  const diagnosis = await loaders.diagnosis.load(id);
  return diagnosis;
};

export const createDiagnosis: MutationResolvers['createDiagnosis'] = async (
  _,
  { url },
  { controllers },
) => {
  const diagnosis = await controllers.diagnosis.create(url);
  return diagnosis;
};

export const deleteDiagnosis: MutationResolvers['deleteDiagnosis'] = async (
  _,
  { id },
  { controllers },
) => {
  const result = await controllers.diagnosis.delete(id);
  return result;
};
