import { inject, injectable } from 'inversify';

import { Logger } from '../../domain/services/logger';
import { TYPES } from '../../types';
import { DiagnosisRepository } from '../repositories';
import {
  QueueDiagnosisRequest,
  QueueDiagnosisResponse,
  QueueDiagnosisUseCase,
} from '../use-cases';

@injectable()
export class QueueDiagnosisInteractor implements QueueDiagnosisUseCase {
  constructor(
    @inject(TYPES.Logger)
    private readonly logger: Logger,

    @inject(TYPES.DiagnosisRepository)
    private readonly diagnosisRepository: DiagnosisRepository,
  ) {}

  async run({
    diagnosis,
  }: QueueDiagnosisRequest): Promise<QueueDiagnosisResponse> {
    await this.diagnosisRepository.queue(diagnosis);
    this.logger.info(`Diagnosis ${diagnosis.id} were queued`);
    return;
  }
}
