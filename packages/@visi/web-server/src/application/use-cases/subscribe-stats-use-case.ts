import { Observable } from 'rxjs';

import { Stats } from '../../domain/models';

export type SubscribeStatsResponse = Observable<Stats>;

export interface SubscribeStatsUseCase {
  run(): SubscribeStatsResponse;
}
