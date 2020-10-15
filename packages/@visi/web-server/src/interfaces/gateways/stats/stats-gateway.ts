import { inject, injectable } from 'inversify';
import { Observable, Subject } from 'rxjs';

import { StatsRepository } from '../../../application/repositories';
import { Stats } from '../../../domain/models';
import { Logger } from '../../../domain/services';
import { TYPES } from '../../../types';
import { ProcessDiagnosisQueue, ProcessDiagnosisQueueEvents } from '../queues';

@injectable()
export class StatsGateway implements StatsRepository {
  private readonly stream$ = new Subject<Stats>();

  constructor(
    @inject(TYPES.ProcessDiagnosisQueue)
    private readonly processDiagnosisQueue: ProcessDiagnosisQueue,

    @inject(TYPES.ProcessDiagnosisQueueEvents)
    private readonly processDiagnosisQueueEvents: ProcessDiagnosisQueueEvents,

    @inject(TYPES.Logger)
    private readonly logger: Logger,
  ) {
    // TODO: Client that want to subscribe events other than complete would get issue
    processDiagnosisQueueEvents.on('completed', this.handleEvents);
  }

  async fetch(): Promise<Stats> {
    const diagnosisCompleteCount = await this.processDiagnosisQueue
      .getCompletedCount()
      .catch((error) => {
        this.logger.error(error);
        return 0;
      });

    const diagnosisWaitingCount = await this.processDiagnosisQueue
      .getWaitingCount()
      .catch((error) => {
        this.logger.error(error);
        return 0;
      });

    return Stats.from({
      diagnosisCompleteCount,
      diagnosisWaitingCount,
    });
  }

  subscribe(): Observable<Stats> {
    return this.stream$;
  }

  private handleEvents = async () => {
    try {
      this.logger.debug('publishing latest stats');
      this.stream$.next(await this.fetch());
    } catch (error) {
      this.logger.error(error);
    }
  };
}
