import { diagnosis } from '../../../__fixtures__/diagnosis';
import progress from '../../../__fixtures__/progress.json';
import { createContainer } from '../../../tests/container';
import { diagnosis$ } from '../../../tests/core';
import { TYPES } from '../../../types';
import { DiagnosisRepository } from '../../repositories';
import { ProcessDiagnosisUseCase } from '../../use-cases';

describe('ProcessDiagnosisInteractor', () => {
  let processDiagnosis: ProcessDiagnosisUseCase;
  let diagnosisRepository: DiagnosisRepository;

  beforeAll(async () => {
    const container = createContainer();
    processDiagnosis = container.get(TYPES.ProcessDiagnosisUseCase);
    diagnosisRepository = container.get(TYPES.DiagnosisRepository);
    await diagnosisRepository.save(diagnosis);
  });

  it('processes diagnosis', async () => {
    process.nextTick(() => {
      diagnosis$.next(progress);
      diagnosis$.complete();
    });

    await processDiagnosis.run({ id: diagnosis.id });

    expect(await diagnosisRepository.find([diagnosis.id])).toEqual([
      expect.objectContaining({
        totalCount: 10,
        doneCount: 2,
        reports: expect.arrayContaining([
          expect.objectContaining({
            outcome: 'passed',
          }),
        ]),
      }),
    ]);
  });
});
