import { IsEnum, IsUUID, Length } from 'class-validator';

import { Model } from './model';

export enum RuleType {
  ATOMIC = 'atomic',
  COMPOSITE = 'composite',
}

export class Rule extends Model {
  @IsUUID()
  readonly id!: string;

  @Length(1, 255)
  readonly coreId!: string;

  @Length(1, 255)
  readonly name!: string;

  @IsEnum(RuleType)
  readonly type!: RuleType;

  @Length(0, 225)
  readonly description!: string;

  readonly keywords?: readonly string[];
}
