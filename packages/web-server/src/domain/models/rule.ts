import { IsEnum, Length } from 'class-validator';

import { validateOrRejectSync } from '../../utils/validate-or-reject-sync';

export enum RuleType {
  ATOMIC = 'atomic',
  COMPOSITE = 'composite',
}

export interface RuleConstructorParams {
  id: string;
  type: RuleType;
  description: string;
}

export class Rule {
  readonly id: string;

  @IsEnum(RuleType)
  readonly type: RuleType;

  @Length(0, 225)
  readonly description: string;

  constructor(params: RuleConstructorParams) {
    this.id = params.id;
    this.type = params.type;
    this.description = params.description;
    validateOrRejectSync(this);
  }
}
