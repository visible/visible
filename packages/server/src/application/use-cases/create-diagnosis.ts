import { injectable, inject } from 'inversify';
import { Diagnosis, Report } from '../../enterprise/entities';
import { DiagnosisRepository } from '../repositories/diagnosis-repository';
import { TYPES } from '../../types';
import { DiagnosisWorker } from '../workers/diagnosis-worker';

export type CreateDiagnosisOutput = Diagnosis;

export interface CreateDiagnosisInput {
  readonly reports: Report[];
}

@injectable()
export class CreateDiagnosis {
  @inject(TYPES.DiagnosisRepository)
  private readonly diagnosisRepository: DiagnosisRepository;

  @inject(TYPES.DiagnosisWorker)
  private readonly diagnosisWorker: DiagnosisWorker;

  async run(input: CreateDiagnosisInput): Promise<CreateDiagnosisOutput> {
    const entry = await this.diagnosisRepository.create(input);
    await this.diagnosisWorker.append(entry);
    return entry;
  }
}
