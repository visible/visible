import { DiagnosisRepository } from '../repositories/diagnosis-repository';

export class GetDiagnosis {
  constructor(private diagnosisRepository: DiagnosisRepository) {}

  run(id: string) {
    return this.diagnosisRepository.get(id);
  }
}
