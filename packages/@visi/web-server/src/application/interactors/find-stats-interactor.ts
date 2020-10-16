import { inject, injectable } from 'inversify';

import { TYPES } from '../../types';
import { StatsRepository } from '../repositories';
import { FindStatsUseCase, FindStatsUseCaseResponse } from '../use-cases';

@injectable()
export class FindStatsInteractor implements FindStatsUseCase {
  constructor(
    @inject(TYPES.StatsRepository)
    private readonly statsRepository: StatsRepository,
  ) {}

  async run(): Promise<FindStatsUseCaseResponse> {
    return {
      stats: await this.statsRepository.fetch(),
    };
  }
}
