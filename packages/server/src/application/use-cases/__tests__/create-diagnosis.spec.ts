import { DiagnosisRepositoryInMemoryImpl } from '../../../frameworks/database/repositories/diagnosis-repository-in-memory-impl';
import { CreateDiagnosis } from '../create-diagnosis';
import { Diagnosis } from '../../../enterprise/entities';

describe('CreateDiagnosis', () => {
  let createDiagnosis: CreateDiagnosis;

  beforeAll(() => {
    const diagnosisRepository = new DiagnosisRepositoryInMemoryImpl();
    createDiagnosis = new CreateDiagnosis(diagnosisRepository);
  });

  it('creates properly', async () => {
    const diagnosis = new Diagnosis(
      '123',
      [],
      new Date('2020'),
      new Date('2020'),
    );

    const result = await createDiagnosis.run(diagnosis);
    expect(result).toBe(diagnosis);
  });
});
