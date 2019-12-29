import { injectable, inject } from 'inversify';
import { Diagnosis } from '../../enterprise/entities';
import { DiagnosisRepository } from '../repositories/diagnosis-repository';
import { TYPES } from '../../types';

type CreateDiagnosisInput = Diagnosis;
type CreateDiagnosisOutput = Diagnosis;

@injectable()
export class CreateDiagnosis {
  @inject(TYPES.DiagnosisRepository)
  private diagnosisRepository: DiagnosisRepository;

  run(input: CreateDiagnosisInput): Promise<CreateDiagnosisOutput> {
    return this.diagnosisRepository.create(input);
  }
}
