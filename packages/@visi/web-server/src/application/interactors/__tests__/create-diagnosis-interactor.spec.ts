import mockFs from 'mock-fs';

import letterhead from '../../../__fixtures__/letterhead.json';
import { Status } from '../../../domain/models';
import { createContainer } from '../../../tests/container';
import { TYPES } from '../../../types';
import { DiagnosisRepository } from '../../repositories';
import { CreateDiagnosisUseCase } from '../../use-cases';

describe('CreateDiagnosisInteractor', () => {
  let createDiagnosis: CreateDiagnosisUseCase;
  let diagnosisRepository: DiagnosisRepository;

  beforeAll(() => {
    mockFs({
      [letterhead.screenshot]: '',
    });

    const container = createContainer();
    createDiagnosis = container.get(TYPES.CreateDiagnosisUseCase);
    diagnosisRepository = container.get(TYPES.DiagnosisRepository);
  });

  it('creates diagnosis', async () => {
    const { diagnosis } = await createDiagnosis.run({
      url: 'https://example.com',
    });

    expect(diagnosis.url).toBe('https://example.com');
    expect(diagnosis.status).toBe(Status.STARTED);
    expect(await diagnosisRepository.find([diagnosis.id])).toEqual([diagnosis]);
  });
});
