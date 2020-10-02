import { RuleType } from '../../domain/models';

export interface CreateRuleRequest {
  readonly coreId: string;
  readonly name: string;
  readonly type: RuleType;
  readonly description: string;
  readonly keywords?: readonly string[];
  readonly mapping?: readonly string[];
}

export interface CreateRuleUseCase {
  run(input: CreateRuleRequest): Promise<void>;
}
