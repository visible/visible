import { Source } from '../source';

export interface Progress {
  readonly totalCount: number;
  readonly doneCount: number;
  readonly sources: Map<string, Source>;
}
