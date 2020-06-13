import Bull from 'bull';
import { inject, injectable } from 'inversify';

import { Diagnosis } from '../../domain/models';
import { JustProps } from '../../domain/models/model';
import { TYPES } from '../../types';
import { Config } from '../config';

export type JobData = JustProps<Diagnosis>;

@injectable()
export class ProcessDiagnosisJob {
  readonly queue: Bull.Queue<JobData>;

  constructor(
    @inject(TYPES.Config)
    config: Config,
  ) {
    this.queue = new Bull('process_diagnosis', {
      redis: {
        port: config.redis.port,
        host: config.redis.host,
        password: config.redis.password,
      },
    });
  }
}

@injectable()
export class PublishDiagnosisJob {
  readonly queue: Bull.Queue<JobData>;

  constructor(
    @inject(TYPES.Config)
    config: Config,
  ) {
    this.queue = new Bull('publish_diagnosis', {
      redis: {
        port: config.redis.port,
        host: config.redis.host,
        password: config.redis.password,
      },
    });
  }
}
