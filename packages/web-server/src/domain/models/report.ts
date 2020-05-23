import { IsEnum, IsOptional, IsUUID, Length } from 'class-validator';

import { Model } from './model';
import { Pointer } from './pointer';
import { Rule } from './rule';

export enum Outcome {
  FAIL = 'fail',
  PASSED = 'passed',
  INAPPLICABLE = 'inapplicable',
}

export class Report extends Model {
  @IsUUID()
  readonly id!: string;

  @IsUUID()
  readonly diagnosisId!: string;

  @IsEnum(Outcome)
  readonly outcome!: Outcome;

  readonly rule!: Rule;

  @IsOptional()
  @Length(1, 255)
  readonly target?: string;

  @IsOptional()
  @Length(1, 255)
  readonly message?: string;

  @IsOptional()
  readonly pointers?: Pointer[];
}
