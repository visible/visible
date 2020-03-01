import { Container } from 'inversify';

import { Diagnosis } from '../../../enterprise/entities';
import { DiagnosisRepositoryInMemoryImpl } from '../../../frameworks/database/repositories/diagnosis-repository-in-memory-impl';
import { TYPES } from '../../../types';
import { DiagnosisRepository } from '../../repositories/diagnosis-repository';
import { CreateDiagnosis } from '../create-diagnosis';

describe('CreateDiagnosis', () => {
  let createDiagnosis: CreateDiagnosis;

  beforeAll(() => {
    const container = new Container();
    container
      .bind<DiagnosisRepository>(TYPES.DiagnosisRepository)
      .to(DiagnosisRepositoryInMemoryImpl);
    container.bind<CreateDiagnosis>(CreateDiagnosis).toSelf();
    createDiagnosis = container.get(CreateDiagnosis);
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