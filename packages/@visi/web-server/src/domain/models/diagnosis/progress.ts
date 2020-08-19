import { Model } from '../model';
import { Source } from './source';

export class Progress extends Model {
  readonly doneCount!: number;
  readonly totalCount!: number;
  readonly sources!: readonly Source[];
}
