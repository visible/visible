import { inject, injectable } from 'inversify';

import { Difficulty, Impact, Outcome, Report } from '../../domain/models';
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

  mapImpact(impact: Impact): API.Impact {
    switch (impact) {
      case Impact.MINOR:
        return API.Impact.Minor;
      case Impact.SERIOUS:
        return API.Impact.Serious;
      case Impact.CRITICAL:
        return API.Impact.Critical;
    }
  }

  mapDifficulty(difficulty: Difficulty): API.Difficulty {
    switch (difficulty) {
      case Difficulty.EASY:
        return API.Difficulty.Easy;
      case Difficulty.MEDIUM:
        return API.Difficulty.Medium;
      case Difficulty.DIFFICULT:
        return API.Difficulty.Difficult;
    }
  }

  run(report: Report): API.Report {
    return {
      id: report.id,
      outcome: this.transformOutcome(report.outcome),
      impact: report.impact && this.mapImpact(report.impact),
      difficulty: report.difficulty && this.mapDifficulty(report.difficulty),
      target: report.target,
      screenshot: report.screenshot,
      message: report.message,
      diffHunk: report.diffHunk,
      location: report.location && this.locationPresenter.run(report.location),
    };
  }
}
