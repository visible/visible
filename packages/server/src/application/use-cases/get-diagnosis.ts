import { injectable, inject } from 'inversify';
import { DiagnosisRepository } from '../repositories/diagnosis-repository';
import { TYPES } from '../../types';

@injectable()
export class GetDiagnosis {
  @inject(TYPES.DiagnosisRepository)
  private diagnosisRepository: DiagnosisRepository;

  run(id: string) {
    return this.diagnosisRepository.get(id);
  }
}
