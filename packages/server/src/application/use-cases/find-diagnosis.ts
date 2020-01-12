import { injectable, inject } from 'inversify';
import { Diagnosis } from '../../enterprise/entities';
import { DiagnosisRepository } from '../repositories/diagnosis-repository';
import { TYPES } from '../../types';

type FindDiagnosisInput = readonly string[];
type FindDiagnosisResult = Diagnosis[];

@injectable()
export class FindDiagnosis {
  @inject(TYPES.DiagnosisRepository)
  private readonly diagnosisRepository: DiagnosisRepository;

  run(ids: FindDiagnosisInput): Promise<FindDiagnosisResult> {
    return this.diagnosisRepository.find(ids);
  }
}
