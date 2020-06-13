import { inject, injectable } from 'inversify';

import { TYPES } from '../../types';
import { DiagnosisRepository } from '../repositories';
import {
  FindDiagnosisRequest,
  FindDiagnosisResponse,
  FindDiagnosisUseCase,
} from '../use-cases';

@injectable()
export class FindDiagnosisInteractor implements FindDiagnosisUseCase {
  constructor(
    @inject(TYPES.DiagnosisRepository)
    private readonly diagnosisRepository: DiagnosisRepository,
  ) {}

  async run({ ids }: FindDiagnosisRequest): Promise<FindDiagnosisResponse> {
    const diagnoses = await this.diagnosisRepository.find(ids);
    return { diagnoses };
  }
}
