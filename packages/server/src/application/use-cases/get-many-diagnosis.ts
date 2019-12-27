import { DiagnosisRepository } from '../repositories/diagnosis-repository';

export class GetManyDiagnosis {
  constructor(private diagnosisRepository: DiagnosisRepository) {}

  run(ids: readonly string[]) {
    return this.diagnosisRepository.getAll(ids);
  }
}
