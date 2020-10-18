import { isURL } from 'class-validator';
import { inject, injectable } from 'inversify';
import * as uuid from 'uuid';

import { Diagnosis, Status } from '../../domain/models';
import { Logger } from '../../domain/services';
import { TYPES } from '../../types';
import { DiagnosisRepository } from '../repositories';
import {
  CreateDiagnosisRequest,
  CreateDiagnosisResponse,
  CreateDiagnosisUseCase,
} from '../use-cases';

@injectable()
export class CreateDiagnosisInteractor implements CreateDiagnosisUseCase {
  constructor(
    @inject(TYPES.Logger)
    private readonly logger: Logger,

    @inject(TYPES.DiagnosisRepository)
    private readonly diagnosisRepository: DiagnosisRepository,
  ) {}

  async run(params: CreateDiagnosisRequest): Promise<CreateDiagnosisResponse> {
    this.logger.info(`Creating diagnosis for ${params.url}`);

    if (!isURL(params.url, { require_protocol: true })) {
      throw new Error(`Invalid URL ${params.url} given`);
    }

    const diagnosis = Diagnosis.from({
      id: uuid.v4(),
      status: Status.QUEUED,
      url: params.url,
      sources: [],
      totalCount: 0,
      doneCount: 0,
      createdAt: new Date(),
      updatedAt: new Date(),
    });

    this.logger.debug(diagnosis.toString());

    await this.diagnosisRepository.save(diagnosis);
    await this.diagnosisRepository.queue(diagnosis);
    this.logger.info(`Diagnosis ${diagnosis.id} were created and queued`);

    return { diagnosis };
  }
}
