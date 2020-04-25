import { inject, injectable } from 'inversify';

import { TYPES } from '../../types';
import { DiagnosisRepository } from '../repositories';
import { DeleteDiagnosisRequest, DeleteDiagnosisUseCase } from '../use-cases';

@injectable()
export class DeleteDiagnosisInteractor implements DeleteDiagnosisUseCase {
  @inject(TYPES.DiagnosisRepository)
  private readonly diagnosisRepository: DiagnosisRepository;

  async run(req: DeleteDiagnosisRequest) {
    const id = await this.diagnosisRepository.delete(req.id);
    return { id };
  }
}
