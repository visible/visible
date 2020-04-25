import { Container } from 'inversify';

import { Diagnosis } from '../../../domain/models';
import { DiagnosisRepositoryInMemoryImpl } from '../../../frameworks/repositories/diagnosis-repository-in-memory-impl';
import { TYPES } from '../../../types';
import { DiagnosisRepository } from '../../repositories/diagnosis-repository';
import { FindDiagnosis } from '../find-diagnosis';

describe('FindDiagnosis', () => {
  let findDiagnosis: FindDiagnosis;

  beforeAll(() => {
    const container = new Container();
    const seed = new Map<string, Diagnosis>([
      ['123', new Diagnosis('123', [], new Date('2020'), new Date('2020'))],
    ]);

    container
      .bind<DiagnosisRepository>(TYPES.DiagnosisRepository)
      .toConstantValue(new DiagnosisRepositoryInMemoryImpl(seed));

    container.bind<FindDiagnosis>(FindDiagnosis).toSelf();

    findDiagnosis = container.get<FindDiagnosis>(FindDiagnosis);
  });

  it('finds properly', async () => {
    const [result] = await findDiagnosis.run(['123']);
    expect(result.id).toBe('123');
  });
});
