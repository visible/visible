import { inject, injectable } from 'inversify';

import { Diagnosis } from '../../enterprise/entities';
import { TYPES } from '../../types';
import { DiagnosisRepository } from '../repositories/diagnosis-repository';

type FindDiagnosisInput = readonly string[];
type FindDiagnosisResult = Diagnosis[];

@injectable()
export class FindDiagnosis {
  @inject(TYPES.DiagnosisRepository)
  private diagnosisRepository: DiagnosisRepository;

  run(ids: FindDiagnosisInput): Promise<FindDiagnosisResult> {
    return this.diagnosisRepository.find(ids);
  }
}
