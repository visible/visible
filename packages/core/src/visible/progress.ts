import { Report } from '../source';

export interface Progress {
  readonly totalCount: number;
  readonly doneCount: number;
  readonly sourceId: string;
  readonly report: Report;
}
