import { Queue } from 'bullmq';
import { inject, injectable } from 'inversify';

import { ProcessDiagnosisQueue } from '../../interfaces/gateways';
import { TYPES } from '../../types';
import { Config } from '../config';

@injectable()
export class ProcessDiagnosisQueueImpl extends Queue
  implements ProcessDiagnosisQueue {
  constructor(
    @inject(TYPES.Config)
    private readonly config: Config,
  ) {
    super('ProcessDiagnosis', {
      connection: {
        host: config.redis.host,
        port: config.redis.port,
        password: config.redis.password,
      },
    });
  }
}
