import { diagnosis } from '../../../__fixtures__/diagnosis';
import { progress } from '../../../__fixtures__/progress';
import { source } from '../../../__fixtures__/source';
// eslint-disable-next-line
import { stream$ } from '../../../frameworks/services/analyzer/mock-analyzer';
import { createContainer } from '../../../tests/container';
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
      stream$.next(progress);
      stream$.complete();
    });

    await processDiagnosis.run({ id: diagnosis.id });

    expect(await diagnosisRepository.find([diagnosis.id])).toEqual([
      expect.objectContaining({
        doneCount: 1,
        totalCount: 2,
        sources: expect.arrayContaining([source]),
      }),
    ]);
  });
});
