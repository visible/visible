import { injectable, inject } from 'inversify';
import { TYPES } from '../../types';
import { DiagnosisRepository } from '../repositories/diagnosis-repository';
import { Diagnosis } from '../../enterprise/entities';

export type UpdateDiagnosisInput = Diagnosis;
export type UpdateDiagnosisOutput = Diagnosis;

@injectable()
export class UpdateDiagnosis {
  @inject(TYPES.DiagnosisRepository)
  private readonly diagnosisRepository: DiagnosisRepository;

  run(input: UpdateDiagnosisInput): Promise<UpdateDiagnosisOutput> {
    return this.diagnosisRepository.update(input);
  }
}
