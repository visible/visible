import { Container } from 'inversify';

import { Diagnosis } from '../../../enterprise/entities';
import { DiagnosisRepositoryInMemoryImpl } from '../../../frameworks/database/repositories/diagnosis-repository-in-memory-impl';
import { TYPES } from '../../../types';
import { DiagnosisRepository } from '../../repositories/diagnosis-repository';
import { DeleteDiagnosis } from '../delete-diagnosis';

describe('DeleteDiagnosis', () => {
  let deleteDiagnosis: DeleteDiagnosis;

  beforeAll(() => {
    const container = new Container();
    const seed = new Map<string, Diagnosis>([
      ['123', new Diagnosis('123', [], new Date('2020'), new Date('2020'))],
    ]);

    container
      .bind<DiagnosisRepository>(TYPES.DiagnosisRepository)
      .toConstantValue(new DiagnosisRepositoryInMemoryImpl(seed));

    container.bind<DeleteDiagnosis>(DeleteDiagnosis).toSelf();
    deleteDiagnosis = container.get<DeleteDiagnosis>(DeleteDiagnosis);
  });

  it('deletes properly', async () => {
    const result = await deleteDiagnosis.run('123');
    expect(result).toBe('123');
  });
});
