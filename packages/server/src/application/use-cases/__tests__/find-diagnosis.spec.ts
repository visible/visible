import { Container } from 'inversify';
import { DiagnosisRepositoryInMemoryImpl } from '../../../frameworks/database/repositories/diagnosis-repository-in-memory-impl';
import { Diagnosis } from '../../../enterprise/entities';
import { FindDiagnosis } from '../find-diagnosis';
import { DiagnosisRepository } from '../../repositories/diagnosis-repository';
import { TYPES } from '../../../types';

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
