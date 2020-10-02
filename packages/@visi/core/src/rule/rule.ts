import { Context } from '.';

export enum RuleType {
  ATOMIC = 'atomic',
  COMPOSITE = 'composite',
}

export interface Rule {
  readonly id: string;
  readonly type: RuleType;
  readonly name: string;
  readonly description: string;
  /** @experimental */
  readonly mapping?: readonly string[];
  /** @experimental 利用頻度を見つつstableにするかも */
  readonly keywords?: readonly string[];
  create(context: Context): Promise<void>;
}

export interface RuleConstructor {
  new (): Rule;
}
