import { DiagnosisRepositoryInMemoryImpl } from '../../../frameworks/database/repositories/diagnosis-repository-in-memory-impl';
import { Diagnosis } from '../../../enterprise/entities';
import { DeleteDiagnosis } from '../delete-diagnosis';

describe('DeleteDiagnosis', () => {
  let deleteDiagnosis: DeleteDiagnosis;

  beforeAll(() => {
    const diagnosisRepository = new DiagnosisRepositoryInMemoryImpl(
      new Map<string, Diagnosis>([
        ['123', new Diagnosis('123', [], new Date('2020'), new Date('2020'))],
      ]),
    );
    deleteDiagnosis = new DeleteDiagnosis(diagnosisRepository);
  });

  it('deletes properly', async () => {
    const result = await deleteDiagnosis.run('123');
    expect(result).toBe('123');
  });
});
