import { Worker } from 'bullmq';
import { inject, injectable } from 'inversify';

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
  ) {
    super(
      'ProcessDiagnosis',
      async (job) => {
        try {
          this.diagnosisController.process(job.name);
        } catch (error) {
          // eslint-disable-next-line
        console.error(JSON.stringify(error, null, 2));
        }
      },
      {
        connection: {
          host: config.redis.host,
          port: config.redis.port,
          password: config.redis.password,
        },
      },
    );
  }
}
