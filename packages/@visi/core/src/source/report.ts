import { Location, LocationConstructorParams } from './location';

export enum Outcome {
  INAPPLICABLE = 'inapplicable',
  PASSED = 'passed',
  FAIL = 'fail',
}

export type Fix = () => Promise<void>;

export interface ReportConstructorParams {
  ruleId: string;
  outcome: Outcome;
  target: string;
  location?: LocationConstructorParams;
  message?: string;
  screenshot?: string;
  fix?: Fix;
}

export class Report {
  readonly ruleId: string;
  readonly outcome: Outcome;
  readonly target: string;
  readonly location?: Location;
  readonly message?: string;
  readonly screenshot?: string;
  readonly fix?: Fix;

  constructor(params: ReportConstructorParams) {
    this.ruleId = params.ruleId;
    this.outcome = params.outcome;
    this.target = params.target;
    this.message = params.message;
    this.screenshot = params.screenshot;
    this.fix = params.fix && params.fix.bind(params);

    if (params.location != null) {
      this.location = new Location(params.location);
    }
  }
}
