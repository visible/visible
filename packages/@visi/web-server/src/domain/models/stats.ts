import { Model } from './model';

export class Stats extends Model {
  readonly diagnosisCompleteCount!: number;
  readonly diagnosisWaitingCount!: number;
}
