import { Diagnosis } from '../../enterprise/entities';
import { DiagnosisRepository } from '../repositories/diagnosis-repository';

type FindDiagnosisInput = readonly string[];
type FindDiagnosisResult = Diagnosis[];

export class FindDiagnosis {
  constructor(private diagnosisRepository: DiagnosisRepository) {}

  run(ids: FindDiagnosisInput): Promise<FindDiagnosisResult> {
    return this.diagnosisRepository.find(ids);
  }
}
