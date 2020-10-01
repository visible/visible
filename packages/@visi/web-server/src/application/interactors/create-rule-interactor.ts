import { inject, injectable } from 'inversify';
import * as uuid from 'uuid';

import { Rule } from '../../domain/models';
import { TYPES } from '../../types';
import { RuleRepository } from '../repositories';
import {
  CreateRuleRequest,
  CreateRuleUseCase,
} from '../use-cases/create-rule-use-case';

@injectable()
export class CreateRulesInteractor implements CreateRuleUseCase {
  constructor(
    @inject(TYPES.RuleRepository)
    private readonly ruleRepository: RuleRepository,
  ) {}

  async run(req: CreateRuleRequest): Promise<void> {
    const rule = await this.ruleRepository.findByCoreId(req.coreId);

    if (rule != null) {
      const newRule = Rule.from({
        id: rule.id,
        ...req,
      });
      await this.ruleRepository.update(newRule);
      return;
    }

    const newRule = Rule.from({
      id: uuid.v4(),
      coreId: req.coreId,
      name: req.name,
      type: req.type,
      description: req.description,
      keywords: req.keywords,
      mapping: req.mapping,
    });

    await this.ruleRepository.save(newRule);
  }
}
