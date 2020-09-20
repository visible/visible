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
    if (await this.checkIfRuleExists(req.coreId)) {
      return;
    }

    await this.ruleRepository.save(
      Rule.from({
        id: uuid.v4(),
        coreId: req.coreId,
        name: req.name,
        type: req.type,
        description: req.description,
        keywords: req.keywords,
      }),
    );
  }

  private async checkIfRuleExists(coreId: string) {
    const rule = await this.ruleRepository.findByCoreId(coreId);
    return rule != null;
  }
}
