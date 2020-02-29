import { inject, injectable } from 'inversify';

import { TYPES } from '../../types';
import { DiagnosisRepository } from '../repositories/diagnosis-repository';

@injectable()
export class DeleteDiagnosis {
  @inject(TYPES.DiagnosisRepository)
  private diagnosisRepository: DiagnosisRepository;

  run(id: string) {
    return this.diagnosisRepository.delete(id);
  }
}
