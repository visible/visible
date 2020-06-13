import { diagnosis } from '../../../__fixtures__/diagnosis';
import { createContainer } from '../../../tests/container';
import { TYPES } from '../../../types';
import { DiagnosisRepository } from '../../repositories';
import { DeleteDiagnosisUseCase } from '../../use-cases';

describe('DeleteDiagnosisInteractor', () => {
  let deleteDiagnosis: DeleteDiagnosisUseCase;
  let diagnosisRepository: DiagnosisRepository;

  beforeAll(async () => {
    const container = createContainer();
    deleteDiagnosis = container.get(TYPES.DeleteDiagnosisUseCase);
    diagnosisRepository = container.get(TYPES.DiagnosisRepository);
  });

  it('deletes diagnosis', async () => {
    await diagnosisRepository.save(diagnosis);
    const { id } = await deleteDiagnosis.run({
      id: diagnosis.id,
    });
    const record = await diagnosisRepository.find([diagnosis.id]);

    expect(id).toBe(diagnosis.id);
    expect(record).toEqual([]);
  });
});
