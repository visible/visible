import path from 'path';

import { Session } from '../driver';
import { Provider } from '../provider';
import { Settings } from '../settings';
import {
  CSSNode,
  Difficulty,
  HTMLNode,
  Impact,
  Location,
  Outcome,
  Report,
} from '../source';
import { Rule } from './rule';

export interface InapplicableReportParams {
  outcome: Outcome.INAPPLICABLE;
  target: string;
}

export interface PassedReportParams {
  outcome: Outcome.PASSED;
  target: string;
}

export interface FailReportParams<T> {
  outcome: Outcome.FAIL;
  impact: Impact;
  difficulty: Difficulty;
  target: string;
  message: string;
  fix?(node: T): Promise<T>;
}

export type ReportHTMLParams =
  | InapplicableReportParams
  | PassedReportParams
  | FailReportParams<HTMLNode>;

export type ReportCSSParams = (
  | InapplicableReportParams
  | PassedReportParams
  | FailReportParams<CSSNode>
) & { propertyName: string };

export interface Context {
  readonly session: Session;
  readonly settings: Settings;
  readonly provider: Provider;
  reportHTML(params: ReportHTMLParams): Promise<void>;
  reportCSS(params: ReportCSSParams): Promise<void>;
}

export class ContextImpl implements Context {
  private doneCount = 0;

  constructor(
    readonly ruleId: string,
    readonly settings: Settings,
    readonly session: Session,
    readonly rules: Rule[],
    readonly provider: Provider,
  ) {}

  async reportHTML(params: ReportHTMLParams): Promise<void> {
    const { target } = params;

    if (this.doneCount >= this.settings.maxReportsCountPerRule) {
      return;
    }

    const result = await this.session.findHTML(target);
    if (result == null) {
      throw new Error(`Not matching xpath found for ${target}`);
    }

    const [sourceId, node] = result;
    const source = this.session.sources.get(sourceId);

    if (source == null) {
      throw new Error(`Original source for html is not memoised`);
    }

    if (node.startIndex == null || node.endIndex == null) {
      throw new Error(`startIndex or endIndex is not given for the HTML Node`);
    }

    const location = Location.fromIndices(
      source.node.text,
      node.startIndex,
      node.endIndex,
    );
    const screenshot = await this.takeScreenshot(target);

    const report = new Report({
      ...params,
      ruleId: this.ruleId,
      node: new HTMLNode(node),
      screenshot,
      location,
    });

    source.addReport(report);
    this.doneCount++;
  }

  async reportCSS(params: ReportCSSParams): Promise<void> {
    const { target, propertyName } = params;

    if (this.doneCount >= this.settings.maxReportsCountPerRule) {
      return;
    }

    const result = await this.session.findCSS(target, propertyName);
    if (result == null) {
      throw new Error(
        `No CSS declaration with propertyName ${propertyName} for ${target} found`,
      );
    }

    const [sourceId, node] = result;
    const source = this.session.sources.get(sourceId);

    if (source == null) {
      throw new Error(`Source for ${sourceId} is not memoised`);
    }

    if (
      node.source == null ||
      node.source.start == null ||
      node.source.end == null
    ) {
      throw new Error('No indices provided');
    }

    const location = new Location({
      startLine: node.source.start.line,
      startColumn: node.source.start.column,
      endLine: node.source.end.line,
      endColumn: node.source.end.column,
    });

    const screenshot = await this.takeScreenshot(target);

    const report = new Report({
      ...params,
      ruleId: this.ruleId,
      node: new CSSNode(node),
      location,
      screenshot,
    });

    source.addReport(report);
    this.doneCount++;
  }

  private takeScreenshot(target: string) {
    const { screenshotDir } = this.settings;
    return this.session.takeScreenshotForXPath(target, {
      type: 'png',
      path: path.join(screenshotDir, Date.now().toString()),
    });
  }
}
