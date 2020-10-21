import { inject, injectable } from 'inversify';

import { TYPES } from '../../types';
import { StatsRepository } from '../repositories';
import { SubscribeStatsResponse, SubscribeStatsUseCase } from '../use-cases';

@injectable()
export class SubscribeStatsInteractor implements SubscribeStatsUseCase {
  constructor(
    @inject(TYPES.StatsRepository)
    private readonly statsRepository: StatsRepository,
  ) {}

  run(): SubscribeStatsResponse {
    return this.statsRepository.subscribe();
  }
}
