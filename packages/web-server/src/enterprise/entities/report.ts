import { IsEnum, IsOptional, IsUUID, Length } from 'class-validator';

import { validateOrRejectSync } from '../../utils/validate-or-reject-sync';
import { Pointer } from './pointer';
import { Rule } from './rule';

export enum Outcome {
  FAIL = 'fail',
  PASSED = 'passed',
  INAPPLICABLE = 'inapplicable',
}

export interface ReportConstructorParams {
  id: string;
  rule: Rule;
  outcome: Outcome;
  target?: string;
  message?: string;
  pointers?: Pointer[];
}

export class Report {
  @IsUUID()
  readonly id: string;

  @IsEnum(Outcome)
  readonly outcome: Outcome;

  readonly rule: Rule;

  @IsOptional()
  @Length(1, 255)
  readonly target?: string;

  @IsOptional()
  @Length(1, 255)
  readonly message?: string;

  @IsOptional()
  readonly pointers?: Pointer[];

  constructor(params: ReportConstructorParams) {
    this.id = params.id;
    this.outcome = params.outcome;
    this.rule = params.rule;
    this.target = params.target;
    this.message = params.message;
    this.pointers = params.pointers;
    validateOrRejectSync(this);
  }
}
