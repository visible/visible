import { injectable } from 'inversify';

import { Stats } from '../../domain/models';
import { API } from './types';

@injectable()
export class StatsPresenter {
  run(stats: Stats): API.Stats {
    return {
      diagnosisCompleteCount: stats.diagnosisCompleteCount,
    };
  }
}
