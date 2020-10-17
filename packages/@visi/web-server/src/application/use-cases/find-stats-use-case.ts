import { Stats } from '../../domain/models';

export interface FindStatsUseCaseResponse {
  stats: Stats;
}

export interface FindStatsUseCase {
  run(): Promise<FindStatsUseCaseResponse>;
}
