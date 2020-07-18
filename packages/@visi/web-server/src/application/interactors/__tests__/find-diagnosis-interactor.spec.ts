import { diagnosis } from '../../../__fixtures__/diagnosis';
import { createContainer } from '../../../tests/container';
import { TYPES } from '../../../types';
import { DiagnosisRepository } from '../../repositories';
import { FindDiagnosisUseCase } from '../../use-cases';

describe('FindDiagnosisInteractor', () => {
  let diagnosisRepository: DiagnosisRepository;
  let findDiagnosis: FindDiagnosisUseCase;

  beforeAll(() => {
    const container = createContainer();
    diagnosisRepository = container.get(TYPES.DiagnosisRepository);
    findDiagnosis = container.get(TYPES.FindDiagnosisUseCase);
  });

  it('finds diagnosis', async () => {
    await diagnosisRepository.save(diagnosis);
    const { diagnoses } = await findDiagnosis.run({
      ids: [diagnosis.id],
    });
    expect(diagnoses[0].id).toBe(diagnosis.id);
  });
});
