import { inject, injectable } from 'inversify';

import { Diagnosis, Report } from '../../domain/models';
import { TYPES } from '../../types';
import { DiagnosisRepository } from '../repositories/diagnosis-repository';

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
