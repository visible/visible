import { DiagnosisRepositoryInMemoryImpl } from '../../../frameworks/database/repositories/diagnosis-repository-in-memory-impl';
import { Diagnosis } from '../../../enterprise/entities';
import { FindDiagnosis } from '../find-diagnosis';

describe('FindDiagnosis', () => {
  let findDiagnosis: FindDiagnosis;

  beforeAll(() => {
    const diagnosisRepository = new DiagnosisRepositoryInMemoryImpl(
      new Map<string, Diagnosis>([
        ['123', new Diagnosis('123', [], new Date('2020'), new Date('2020'))],
      ]),
    );
    findDiagnosis = new FindDiagnosis(diagnosisRepository);
  });

  it('finds properly', async () => {
    const [result] = await findDiagnosis.run(['123']);
    expect(result.id).toBe('123');
  });
});
