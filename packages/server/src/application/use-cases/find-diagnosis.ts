import { DiagnosisRepository } from '../repositories/diagnosis-repository';

export class FindDiagnosis {
  constructor(private diagnosisRepository: DiagnosisRepository) {}

  run(ids: readonly string[]) {
    return this.diagnosisRepository.find(ids);
  }
}
