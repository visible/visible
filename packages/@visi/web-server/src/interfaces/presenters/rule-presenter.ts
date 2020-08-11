import { injectable } from 'inversify';

import { Rule, RuleType } from '../../domain/models';
import { RuleAPI, RuleTypeAPI } from './types';

@injectable()
export class RulePresenter {
  transformRuleType(ruleType: RuleType): RuleTypeAPI {
    switch (ruleType) {
      case RuleType.ATOMIC:
        return RuleTypeAPI.ATOMIC;
      case RuleType.COMPOSITE:
        return RuleTypeAPI.COMPOSITE;
    }
  }

  run(rule: Rule): RuleAPI {
    return {
      id: rule.id,
      name: rule.name,
      type: this.transformRuleType(rule.type),
      description: rule.description,
    };
  }
}
