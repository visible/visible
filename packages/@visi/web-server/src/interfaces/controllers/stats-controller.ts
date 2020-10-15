import { toAsyncIterator } from '@visi/prelude';
import { inject, injectable } from 'inversify';
import { map } from 'rxjs/operators';

import {
  FindStatsUseCase,
  SubscribeStatsUseCase,
} from '../../application/use-cases';
import { TYPES } from '../../types';
import { API, StatsPresenter } from '../presenters';

@injectable()
export class StatsController {
  constructor(
    @inject(TYPES.FindStatsUseCase)
    private readonly findStats: FindStatsUseCase,

    @inject(TYPES.SubscribeStatsUseCase)
    private readonly subscribeStats: SubscribeStatsUseCase,

    @inject(StatsPresenter)
    private readonly presenter: StatsPresenter,
  ) {}

  async find(): Promise<API.Stats> {
    const data = await this.findStats.run();
    return this.presenter.run(data.stats);
  }

  subscribe(): AsyncIterableIterator<{ stats: API.Stats }> {
    const stream$ = this.subscribeStats.run().pipe(
      map((stats) => this.presenter.run(stats)),
      map((stats) => ({ stats })),
    );

    return toAsyncIterator(stream$);
  }
}
