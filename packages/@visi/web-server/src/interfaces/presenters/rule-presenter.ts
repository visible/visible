import { injectable } from 'inversify';

import { Rule, RuleType } from '../../domain/models';
import { API } from './types';

@injectable()
export class RulePresenter {
  transformRuleType(ruleType: RuleType): API.RuleType {
    switch (ruleType) {
      case RuleType.ATOMIC:
        return API.RuleType.Atomic;
      case RuleType.COMPOSITE:
        return API.RuleType.Composite;
    }
  }

  run(rule: Rule): API.Rule {
    return {
      id: rule.id,
      coreId: rule.coreId,
      name: rule.name,
      type: this.transformRuleType(rule.type),
      description: rule.description,
      keywords: rule.keywords,
    };
  }
}
