import { Node as HTMLNode } from 'domhandler';
import { getOuterHTML } from 'domutils';
import { Node as CSSNode } from 'postcss';

import { Location, LocationConstructorParams } from './location';

export enum Outcome {
  INAPPLICABLE = 'inapplicable',
  PASSED = 'passed',
  FAIL = 'fail',
}

export interface ReportConstructorParams {
  ruleId: string;
  outcome: Outcome;
  target: string;
  location?: LocationConstructorParams;
  message?: string;
  screenshot?: string;
  fix?(): Promise<void>;
}

export abstract class Report {
  readonly ruleId: string;
  readonly outcome: Outcome;
  readonly target: string;
  readonly location?: Location;
  readonly message?: string;
  readonly screenshot?: string;
  fix?(): Promise<void>;

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

  abstract readonly text: string;
}

export interface HTMLReportConstructorParams extends ReportConstructorParams {
  node: HTMLNode;
}

export class HTMLReport extends Report {
  readonly node: HTMLNode;

  constructor(params: HTMLReportConstructorParams) {
    super(params);
    this.node = params.node;
  }

  get text() {
    return getOuterHTML(this.node);
  }
}

export interface CSSReportConstructorParams extends ReportConstructorParams {
  node: CSSNode;
}

export class CSSReport extends Report {
  readonly node: CSSNode;

  constructor(params: CSSReportConstructorParams) {
    super(params);
    this.node = params.node;
  }

  get text() {
    return this.node.toString();
  }
}
