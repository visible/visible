import { RuleType } from '../../domain/models';

export interface CreateRuleRequest {
  readonly name: string;
  readonly type: RuleType;
  readonly description: string;
}

export interface CreateRuleUseCase {
  run(input: CreateRuleRequest): Promise<void>;
}
