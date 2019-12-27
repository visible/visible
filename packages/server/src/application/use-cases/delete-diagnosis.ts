import { DiagnosisRepository } from '../repositories/diagnosis-repository';

export class DeleteDiagnosis {
  constructor(private diagnosisRepository: DiagnosisRepository) {}

  run(id: string) {
    return this.diagnosisRepository.delete(id);
  }
}
