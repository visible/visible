import { QueryResolvers, MutationResolvers } from '../generated/graphql';
import { DiagnosisController } from '../../adapters/controllers/diagnosis-controller';

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
  { repositories },
) => {
  const diagnosis = await new DiagnosisController(
    repositories.diagnosis,
  ).create(url);
  return diagnosis;
};

export const deleteDiagnosis: MutationResolvers['deleteDiagnosis'] = async (
  _,
  { id },
  { repositories },
) => {
  const result = await new DiagnosisController(repositories.diagnosis).delete(
    id,
  );
  return result;
};
