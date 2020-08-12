import { Context } from '.';

export enum RuleType {
  ATOMIC = 'atomic',
  COMPOSITE = 'composite',
}

export interface Rule {
  readonly id: string;
  readonly type: RuleType;
  readonly description: string;
  create(context: Context): Promise<void>;
}

export interface RuleConstructor {
  new (): Rule;
}