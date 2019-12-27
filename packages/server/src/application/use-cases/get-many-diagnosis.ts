import { injectable, inject } from 'inversify';
import { DiagnosisRepository } from '../repositories/diagnosis-repository';
import { TYPES } from '../../types';

@injectable()
export class GetManyDiagnosis {
  @inject(TYPES.DiagnosisRepository)
  private diagnosisRepository: DiagnosisRepository;

  run(ids: readonly string[]) {
    return this.diagnosisRepository.getAll(ids);
  }
}
