import { DiagnosisRepositoryInMemoryImpl } from '../../../frameworks/database/repositories/diagnosis-repository-in-memory-impl';
import { Diagnosis } from '../../../enterprise/entities';
import { FindDiagnosis } from '../find-diagnosis';

describe('FindDiagnosis', () => {
  let findDiagnosis: FindDiagnosis;

  beforeAll(() => {
    const diagnosisRepository = new DiagnosisRepositoryInMemoryImpl(
      new Map<string, Diagnosis>([
        [
          '123',
          {
            id: '123',
            reports: [
              {
                id: '345',
                name: 'img-alt',
                type: 'ok',
              },
            ],
          },
        ],
      ]),
    );
    findDiagnosis = new FindDiagnosis(diagnosisRepository);
  });

  it('creates properly', async () => {
    const [result] = await findDiagnosis.run(['123']);
    expect(result.reports[0].id).toBe('345');
  });
});
