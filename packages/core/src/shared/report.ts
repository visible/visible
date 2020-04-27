import { Pointer } from './pointer';
import { RuleMetadata } from './rule-metadata';

export interface BaseReport {
  readonly rule: RuleMetadata;
}

export interface TargetAndPointers {
  readonly target: string;
  readonly pointers: Pointer[];
}

export interface InapplicableReport extends BaseReport {
  readonly outcome: 'inapplicable';
}

export interface PassedReport extends BaseReport, TargetAndPointers {
  readonly outcome: 'passed';
}

export interface FailReport extends BaseReport, TargetAndPointers {
  readonly outcome: 'fail';
  readonly message: string;
}

export type Report = InapplicableReport | PassedReport | FailReport;
