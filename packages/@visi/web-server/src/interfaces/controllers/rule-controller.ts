import { inject, injectable } from 'inversify';

import { FindRuleByReportIdUseCase } from '../../application/use-cases/find-rule-by-report-id-use-case';
import { TYPES } from '../../types';
import { API, RulePresenter } from '../presenters';

@injectable()
export class RuleController {
  constructor(
    @inject(TYPES.FindRuleByReportIdUseCase)
    private readonly findRuleByReportId: FindRuleByReportIdUseCase,

    @inject(RulePresenter)
    private readonly rulePresenter: RulePresenter,
  ) {}

  async findByReportId(id: string): Promise<API.Rule> {
    const { rule } = await this.findRuleByReportId.run({ id });
    return this.rulePresenter.run(rule);
  }
}
