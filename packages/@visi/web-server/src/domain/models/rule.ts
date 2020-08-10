import { IsEnum, IsUUID, Length } from 'class-validator';

import { Model } from './model';

export enum RuleType {
  ATOMIC = 'atomic',
  COMPOSITE = 'composite',
}

export class Rule extends Model {
  @IsUUID()
  readonly id!: string;

  @IsEnum(RuleType)
  readonly type!: RuleType;

  @Length(0, 225)
  readonly description!: string;

  readonly name!: string;
}
