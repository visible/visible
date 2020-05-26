import { Visible } from '@visi/core';
import fs from 'fs';
import { inject, injectable } from 'inversify';
import path from 'path';
import * as uuid from 'uuid';

import { Diagnosis, Status } from '../../domain/models';
import { Logger, Storage } from '../../domain/services';
import { TYPES } from '../../types';
import { DiagnosisRepository } from '../repositories';
import { CreateDiagnosisRequest, CreateDiagnosisUseCase } from '../use-cases';

@injectable()
export class CreateDiagnosisInteractor implements CreateDiagnosisUseCase {
  constructor(
    @inject(TYPES.Logger)
    private readonly logger: Logger,

    @inject(TYPES.Storage)
    private readonly storage: Storage,

    @inject(TYPES.DiagnosisRepository)
    private readonly repository: DiagnosisRepository,
  ) {}

  async run(params: CreateDiagnosisRequest) {
    this.logger.info(`Creating diagnosis for ${params.url}`);

    const visible = await Visible.init({
      settings: { screenshotDir: path.join(process.cwd(), 'tmp') },
    });

    await visible.open(params.url);
    const letterhead = await visible.fetchLetterhead();
    await visible.close();

    const stream = fs.createReadStream(letterhead.screenshot);
    const { file } = await this.storage.create(stream);

    this.logger.debug(file);

    const diagnosis = Diagnosis.from({
      id: uuid.v4(),
      status: Status.STARTED,
      url: params.url,
      screenshot: file,
      reports: [],
      totalCount: 0,
      doneCount: 0,
      createdAt: new Date(),
      updatedAt: new Date(),
    });

    this.logger.debug(diagnosis.toString());

    await this.repository.save(diagnosis);
    await this.repository.queue(diagnosis);
    this.logger.info(`Diagnosis ${diagnosis.id} were created and queued`);

    return { diagnosis };
  }
}
