import * as uuid from 'uuid';

import { Location, LocationConstructorParams } from './location';
import { Node } from './node';

export enum Outcome {
  INAPPLICABLE = 'inapplicable',
  PASSED = 'passed',
  FAIL = 'fail',
}

export enum Impact {
  CRITICAL = 'critical',
  SERIOUS = 'serious',
  MINOR = 'minor',
}

export enum Difficulty {
  EASY = 'easy',
  MEDIUM = 'medium',
  DIFFICULT = 'difficult',
}

export interface ReportConstructorParams {
  id?: string;
  node: Node;
  ruleId: string;
  outcome: Outcome;
  target: string;
  impact?: Impact;
  difficulty?: Difficulty;
  location?: LocationConstructorParams;
  message?: string;
  screenshot?: string;
  fix?(node: Node): Promise<Node>;
}

export class Report {
  readonly id: string;
  readonly node: Node;
  readonly ruleId: string;
  readonly outcome: Outcome;
  readonly target: string;
  readonly text: string;
  readonly impact?: Impact;
  readonly difficulty?: Difficulty;
  readonly message?: string;
  readonly screenshot?: string;
  readonly location?: Location;

  constructor(params: ReportConstructorParams) {
    this.id = params.id ?? uuid.v4();
    this.ruleId = params.ruleId;
    this.outcome = params.outcome;
    this.impact = params.impact;
    this.difficulty = params.difficulty;
    this.target = params.target;
    this.message = params.message;
    this.screenshot = params.screenshot;
    this.node = params.node;
    this.text = this.node.text;

    // Without this cause a bug for some reasons
    if (params.location) {
      this.location = new Location(params.location);
    }

    this.fixer = params.fix && params.fix.bind(params);
  }

  clone(): Report {
    return new Report({
      id: this.id,
      ruleId: this.ruleId,
      impact: this.impact,
      difficulty: this.difficulty,
      outcome: this.outcome,
      target: this.target,
      location: this.location,
      message: this.message,
      screenshot: this.screenshot,
      node: this.node.clone(),
      fix: this.fixer,
    });
  }

  async fix(node?: Node): Promise<Node> {
    if (this.fixer == null) {
      return this.node;
    }

    return this.fixer(node ?? this.node);
  }

  private fixer?(node: Node): Promise<Node>;
}
