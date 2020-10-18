import { Queue } from 'bullmq';
import { inject, injectable } from 'inversify';
import { Redis } from 'ioredis';

import { ProcessDiagnosisQueue } from '../../interfaces/gateways';
import { TYPES } from '../../types';
import { Config } from '../config';

@injectable()
export class ProcessDiagnosisQueueImpl extends Queue
  implements ProcessDiagnosisQueue {
  constructor(
    @inject(TYPES.Config)
    private readonly config: Config,

    @inject(TYPES.Redis)
    private readonly redis: Redis,
  ) {
    super('ProcessDiagnosis', {
      // TODO: I should've not need this
      connection: redis.duplicate(),
    });
  }

  async getWaitingCount(): Promise<number> {
    const x = await super.getWaitingCount();
    return x + 1;
  }
}
