import { Diagnosis } from '../../enterprise/entities';
import { DiagnosisRepository } from '../repositories/diagnosis-repository';

type CreateDiagnosisInput = Diagnosis;
type CreateDiagnosisOutput = Diagnosis;

export class CreateDiagnosis {
  constructor(private diagnosisRepository: DiagnosisRepository) {}

  run(input: CreateDiagnosisInput): Promise<CreateDiagnosisOutput> {
    return this.diagnosisRepository.create(input);
  }
}
