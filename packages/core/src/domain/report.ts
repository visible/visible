import { Fixer } from "./fixer";

export type ReportType =
  | 'info'
  | 'warn'
  | 'error';

export interface Report {
  readonly id: string;
  readonly type: ReportType;
  readonly html?: string;
  readonly fixer?: Fixer;
}
