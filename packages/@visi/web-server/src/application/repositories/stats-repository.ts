import { Observable } from 'rxjs';

import { Stats } from '../../domain/models/stats';

export interface StatsRepository {
  fetch(): Promise<Stats>;
  subscribe(): Observable<Stats>;
}
