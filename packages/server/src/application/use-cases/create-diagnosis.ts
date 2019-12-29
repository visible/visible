import { injectable, inject } from 'inversify';
import { Diagnosis, Report } from '../../enterprise/entities';
import { DiagnosisRepository } from '../repositories/diagnosis-repository';
import { TYPES } from '../../types';

export type CreateDiagnosisOutput = Diagnosis;

export interface CreateDiagnosisInput {
  reports: Report[];
}

@injectable()
export class CreateDiagnosis {
  @inject(TYPES.DiagnosisRepository)
  private diagnosisRepository: DiagnosisRepository;

  run(input: CreateDiagnosisInput): Promise<CreateDiagnosisOutput> {
    return this.diagnosisRepository.create(input);
  }
}
