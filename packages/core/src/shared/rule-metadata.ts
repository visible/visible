export type RuleType = 'atomic' | 'composite';

export interface RuleMetadata {
  readonly id: string;
  readonly type: RuleType;
  readonly description: string;
}
