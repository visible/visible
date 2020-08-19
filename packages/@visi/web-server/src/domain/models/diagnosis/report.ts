import {
  IsEnum,
  IsOptional,
  IsUrl,
  IsUUID,
  Length,
  MinLength,
} from 'class-validator';
import { immerable } from 'immer';

import { Model } from '../model';
import { Location } from './location';

export enum Outcome {
  FAIL = 'fail',
  PASSED = 'passed',
  INAPPLICABLE = 'inapplicable',
}

export class Report extends Model {
  @IsUUID()
  readonly id!: string;

  @IsUUID()
  readonly sourceId!: string;

  @IsUUID()
  readonly ruleId!: string;

  @IsEnum(Outcome)
  readonly outcome!: Outcome;

  @IsOptional()
  @Length(1, 255)
  readonly target?: string;

  @IsOptional()
  @Length(1, 255)
  readonly message?: string;

  @IsOptional()
  @IsUrl()
  readonly screenshot?: string;

  @MinLength(1)
  readonly diffHunk?: string;

  readonly location?: Location;

  private readonly [immerable] = true;
}
