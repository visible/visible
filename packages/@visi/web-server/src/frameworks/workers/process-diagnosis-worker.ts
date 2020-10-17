import { Worker } from 'bullmq';
import { inject, injectable } from 'inversify';
import { Redis } from 'ioredis';

import { Logger } from '../../domain/services';
import { DiagnosisController } from '../../interfaces/controllers';
import { TYPES } from '../../types';
import { Config } from '../config';

@injectable()
export class ProcessDiagnosisWorker extends Worker {
  constructor(
    @inject(DiagnosisController)
    private readonly diagnosisController: DiagnosisController,

    @inject(TYPES.Config)
    private readonly config: Config,

    @inject(TYPES.Redis)
    private readonly redis: Redis,

    @inject(TYPES.Logger)
    private readonly logger: Logger,
  ) {
    super(
      'ProcessDiagnosis',
      async (job) => {
        try {
          await this.diagnosisController.process(job.name);
        } catch (error) {
          this.logger.error(error);
        }
      },
      {
        connection: redis,
        concurrency: config.diagnosisWorker.concurrency,
      },
    );
    this.on('error', this.handleMissingFailed);
  }

  // https://github.com/taskforcesh/bullmq/issues/215
  handleMissingFailed = (error: unknown): void => {
    this.logger.error(error);
  };
}
