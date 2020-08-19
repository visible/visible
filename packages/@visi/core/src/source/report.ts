import { Node as HTMLNode } from 'domhandler';
import { getOuterHTML } from 'domutils';
import { parseDOM } from 'htmlparser2';
import { Node as CSSNode } from 'postcss';
import * as uuid from 'uuid';

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
}

export interface BaseReport<T> {
  readonly ruleId: string;
  readonly outcome: Outcome;
  readonly target: string;
  readonly location?: Location;
  readonly message?: string;
  readonly screenshot?: string;
  readonly text: string;
  readonly node: T;
  fix(): Promise<T>;
}

export interface HTMLReportConstructorParams extends ReportConstructorParams {
  node: HTMLNode;
  fix?(node: HTMLNode): Promise<HTMLNode>;
}

export class HTMLReport implements BaseReport<HTMLNode> {
  readonly id: string;
  readonly node: HTMLNode;
  readonly ruleId: string;
  readonly outcome: Outcome;
  readonly target: string;
  readonly location?: Location;
  readonly message?: string;
  readonly screenshot?: string;

  constructor(params: HTMLReportConstructorParams) {
    this.id = uuid.v4();
    this.ruleId = params.ruleId;
    this.outcome = params.outcome;
    this.target = params.target;
    this.message = params.message;
    this.screenshot = params.screenshot;

    if (params.location != null) {
      this.location = new Location(params.location);
    }

    this.node = params.node;
    this.fixer = params.fix && params.fix.bind(params);
  }

  get text(): string {
    return getOuterHTML(this.node);
  }

  clone(): HTMLReport {
    const [newNode] = parseDOM(this.text);
    // Pretend as if it was in original `source`
    newNode.startIndex = this.node.startIndex;
    newNode.endIndex = this.node.endIndex;

    return new HTMLReport({
      ruleId: this.ruleId,
      outcome: this.outcome,
      target: this.target,
      location: this.location,
      message: this.message,
      screenshot: this.screenshot,
      node: newNode,
      fix: this.fixer,
    });
  }

  async fix(): Promise<HTMLNode> {
    if (this.fixer == null) {
      return this.node;
    }

    return this.fixer(this.node);
  }

  private fixer?(node: HTMLNode): Promise<HTMLNode>;
}

export interface CSSReportConstructorParams extends ReportConstructorParams {
  node: CSSNode;
  fix?(node: CSSNode): Promise<CSSNode>;
}

export class CSSReport implements BaseReport<CSSNode> {
  readonly id: string;
  readonly node: CSSNode;
  readonly ruleId: string;
  readonly outcome: Outcome;
  readonly target: string;
  readonly location?: Location;
  readonly message?: string;
  readonly screenshot?: string;

  constructor(params: CSSReportConstructorParams) {
    this.id = uuid.v4();
    this.ruleId = params.ruleId;
    this.outcome = params.outcome;
    this.target = params.target;
    this.message = params.message;
    this.screenshot = params.screenshot;

    if (params.location != null) {
      this.location = new Location(params.location);
    }

    this.node = params.node;
    this.fixer = params.fix && params.fix.bind(params);
  }

  // Hard to create a mock for CSS
  /* istanbul ignore next */
  get text(): string {
    return this.node.toString();
  }

  clone(): CSSReport {
    return new CSSReport({
      ruleId: this.ruleId,
      outcome: this.outcome,
      target: this.target,
      location: this.location,
      message: this.message,
      screenshot: this.screenshot,
      node: this.node.clone(),
      fix: this.fixer,
    });
  }

  async fix(): Promise<CSSNode> {
    if (this.fixer == null) {
      return this.node;
    }

    return this.fixer(this.node);
  }

  private fixer?(node: CSSNode): Promise<CSSNode>;
}

export type Report = HTMLReport | CSSReport;
