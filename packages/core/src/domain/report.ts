import { Fixer } from "./fixer";

export type ReportType =
  | 'ok'
  | 'warn'
  | 'error';

export interface Report {
  readonly id: string;
  readonly type: ReportType;
  readonly html?: string;
}
