import { inject, injectable } from 'inversify';

import { TYPES } from '../../types';
import { DiagnosisRepository } from '../repositories';
import {
  DeleteDiagnosisRequest,
  DeleteDiagnosisResponse,
  DeleteDiagnosisUseCase,
} from '../use-cases';

@injectable()
export class DeleteDiagnosisInteractor implements DeleteDiagnosisUseCase {
  constructor(
    @inject(TYPES.DiagnosisRepository)
    private readonly diagnosisRepository: DiagnosisRepository,
  ) {}

  async run(req: DeleteDiagnosisRequest): Promise<DeleteDiagnosisResponse> {
    const id = await this.diagnosisRepository.delete(req.id);
    return { id };
  }
}
