import { Queue, QueueEvents } from 'bullmq';
import { inject, injectable } from 'inversify';
import { Redis } from 'ioredis';

import { Logger } from '../../domain/services';
import {
  ProcessDiagnosisQueue,
  ProcessDiagnosisQueueEvents,
} from '../../interfaces/gateways';
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

@injectable()
export class ProcessDiagnosisQueueEventsImpl extends QueueEvents
  implements ProcessDiagnosisQueueEvents {
  constructor(
    @inject(TYPES.Config)
    private readonly config: Config,

    @inject(TYPES.Redis)
    private readonly redis: Redis,

    @inject(TYPES.Logger)
    private readonly logger: Logger,
  ) {
    super('ProcessDiagnosis', {
      connection: redis.duplicate(),
    });
  }
}
