import { injectable, inject } from 'inversify';
import { DiagnosisRepository } from '../repositories/diagnosis-repository';
import { TYPES } from '../../types';
import { Diagnosis } from '../../domain/entities/diagnosis';

@injectable()
export class CreateDiagnosis {
  @inject(TYPES.DiagnosisRepository)
  private diagnosticsRepository: DiagnosisRepository;

  run(diagnosis: Diagnosis) {
    return this.diagnosticsRepository.create(diagnosis);
  }
}
