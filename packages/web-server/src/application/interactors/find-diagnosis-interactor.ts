import { inject, injectable } from 'inversify';

import { TYPES } from '../../types';
import { DiagnosisRepository } from '../repositories';
import {
  FindDiagnosisInputData,
  FindDiagnosisOutputData,
  FindDiagnosisUseCase,
} from '../use-cases';

@injectable()
export class FindDiagnosisInteractor implements FindDiagnosisUseCase {
  @inject(TYPES.DiagnosisRepository)
  private readonly diagnosisRepository: DiagnosisRepository;

  async run({ ids }: FindDiagnosisInputData): Promise<FindDiagnosisOutputData> {
    const diagnoses = await this.diagnosisRepository.find(ids);
    return { diagnoses };
  }
}
