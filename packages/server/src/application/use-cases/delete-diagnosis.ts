import { injectable, inject } from 'inversify';
import { DiagnosisRepository } from '../repositories/diagnosis-repository';
import { TYPES } from '../../types';

@injectable()
export class DeleteDiagnosis {
  @inject(TYPES.DiagnosisRepository)
  private readonly diagnosisRepository: DiagnosisRepository;

  run(id: string) {
    return this.diagnosisRepository.delete(id);
  }
}
