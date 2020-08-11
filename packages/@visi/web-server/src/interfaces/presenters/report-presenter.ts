import { inject, injectable } from 'inversify';

import { Outcome, Report } from '../../domain/models';
import { PointerPresenter } from './pointer-presenter';
import { RulePresenter } from './rule-presenter';
import { OutcomeAPI, ReportAPI } from './types';

@injectable()
export class ReportPresenter {
  constructor(
    @inject(RulePresenter)
    private readonly rulePresenter: RulePresenter,

    @inject(PointerPresenter)
    private readonly pointerPresenter: PointerPresenter,
  ) {}

  transformOutcome(outcome: Outcome): OutcomeAPI {
    switch (outcome) {
      case Outcome.FAIL:
        return OutcomeAPI.FAIL;
      case Outcome.PASSED:
        return OutcomeAPI.PASSED;
      case Outcome.INAPPLICABLE:
        return OutcomeAPI.INAPPLICABLE;
    }
  }

  run(report: Report): ReportAPI {
    return {
      id: report.id,
      target: report.target,
      outcome: this.transformOutcome(report.outcome),
      message: report.message,
      rule: this.rulePresenter.run(report.rule),
      pointers: report.pointers?.map((pointer) =>
        this.pointerPresenter.run(pointer),
      ),
    };
  }
}
