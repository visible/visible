import { Pointer } from './pointer';
import { Rule } from './rule';

export enum Outcome {
  FAIL = 'fail',
  PASSED = 'passed',
  INAPPLICABLE = 'inapplicable',
}

export class Report {
  constructor(
    readonly id: string,
    readonly outcome: Outcome,
    readonly rule: Rule,
    readonly target: string,
    readonly message: string,
    readonly pointers: Pointer[],
  ) {}
}
