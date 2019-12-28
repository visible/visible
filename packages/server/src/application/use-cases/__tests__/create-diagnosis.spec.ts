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
    const diagnosis: Diagnosis = {
      id: '123',
      reports: [
        {
          id: '345',
          name: 'img-alt',
          type: 'ok',
        },
      ],
    };

    const result = await createDiagnosis.run(diagnosis);
    expect(result).toBe(diagnosis);
  });
});
