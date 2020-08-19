import { inject, injectable } from 'inversify';

import { Outcome, Report } from '../../domain/models';
import { LocationPresenter } from './location-presenter';
import { API } from './types';

@injectable()
export class ReportPresenter {
  constructor(
    @inject(LocationPresenter)
    private readonly locationPresenter: LocationPresenter,
  ) {}

  transformOutcome(outcome: Outcome): API.Outcome {
    switch (outcome) {
      case Outcome.FAIL:
        return API.Outcome.Fail;
      case Outcome.PASSED:
        return API.Outcome.Passed;
      case Outcome.INAPPLICABLE:
        return API.Outcome.Inapplicable;
    }
  }

  run(report: Report): API.Report {
    return {
      id: report.id,
      outcome: this.transformOutcome(report.outcome),
      target: report.target,
      screenshot: report.screenshot,
      message: report.message,
      diffHunk: report.diffHunk,
      location: report.location && this.locationPresenter.run(report.location),
    };
  }
}
