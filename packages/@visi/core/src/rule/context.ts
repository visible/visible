import { Node as HTMLNode } from 'domhandler';
import path from 'path';
import { Node as CSSNode } from 'postcss';
import { Subject } from 'rxjs';

import { Session } from '../driver';
import { Provider } from '../provider';
import { Settings } from '../settings';
import {
  CSSReport,
  CSSSource,
  HTMLReport,
  HTMLSource,
  Location,
  Outcome,
  Report,
  Source,
} from '../source';
import { Progress } from './progress';
import { Rule } from './rule';

export interface BaseReportParams<T> {
  ruleId: string;
  outcome: Outcome;
  target: string;
  message?: string;
  fix?(node: T): Promise<T>;
}

export type ReportHTMLParams = BaseReportParams<HTMLNode>;

export interface ReportCSSParams extends BaseReportParams<CSSNode> {
  propertyName: string;
}

export interface Context {
  readonly progress$: Subject<Progress>;
  readonly session: Session;
  readonly settings: Settings;
  readonly provider: Provider;
  reportHTML(params: ReportHTMLParams): Promise<void>;
  reportCSS(params: ReportCSSParams): Promise<void>;
}

export class ContextImpl implements Context {
  readonly progress$ = new Subject<Progress>();
  private readonly reportsCountPerRule = new Map<string, number>();
  private doneCount = 0;

  constructor(
    readonly settings: Settings,
    readonly session: Session,
    readonly rules: Rule[],
    readonly provider: Provider,
  ) {}

  async reportHTML(params: ReportHTMLParams): Promise<void> {
    const { target, ruleId } = params;

    if (this.checkIfRuleHasExceededReportLimit(ruleId)) {
      return;
    }

    const result = await this.session.findHTML(target);
    if (result == null) {
      throw new Error(`Not matching xpath found for ${target}`);
    }

    const [sourceId, node] = result;
    const source = this.session.sources.get(sourceId);

    if (!(source instanceof HTMLSource)) {
      throw new Error(`Original source for html is not memoised`);
    }

    if (node.startIndex == null || node.endIndex == null) {
      throw new Error(`startIndex or endIndex is not given for the HTML Node`);
    }

    const location = Location.fromIndices(
      source.text,
      node.startIndex,
      node.endIndex,
    );
    const screenshot = await this.takeScreenshot(target);

    const report = new HTMLReport({
      ...params,
      node,
      screenshot,
      location,
    });

    this.addReport(source, report);
  }

  async reportCSS(params: ReportCSSParams): Promise<void> {
    const { target, ruleId, propertyName } = params;

    if (this.checkIfRuleHasExceededReportLimit(ruleId)) {
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

    if (!(source instanceof CSSSource)) {
      throw new Error(`Source for ${sourceId} is not memoised`);
    }

    if (
      node.source == null ||
      node.source.start == null ||
      node.source.end == null
    ) {
      throw new Error(`Node indices is not give for node ${node}`);
    }

    const location = new Location({
      startLine: node.source.start.line,
      startColumn: node.source.start.column,
      endLine: node.source.end.line,
      endColumn: node.source.end.column,
    });

    const screenshot = await this.takeScreenshot(target);

    const report = new CSSReport({
      ...params,
      node,
      location,
      screenshot,
    });

    this.addReport(source, report);
  }

  private takeScreenshot(target: string) {
    const { screenshotDir } = this.settings;
    return this.session.takeScreenshotForXPath(target, {
      type: 'png',
      path: path.join(screenshotDir, Date.now().toString()),
    });
  }

  private handleNewReport() {
    this.progress$.next({
      doneCount: this.doneCount++,
      totalCount: this.rules.length,
      sources: this.session.sources,
    });
  }

  private addReport(source: Source, report: Report) {
    const reportsCount = this.reportsCountPerRule.get(report.ruleId) ?? 0;
    this.reportsCountPerRule.set(report.ruleId, reportsCount + 1);

    const newSource =
      source instanceof HTMLSource && report instanceof HTMLReport
        ? source.addReport(report)
        : source instanceof CSSSource && report instanceof CSSReport
        ? source.addReport(report)
        : (() => {
            throw new Error(`Unknown source type ${source.type}`);
          })();

    this.session.sources.set(newSource.id, newSource);
    this.handleNewReport();
  }

  private checkIfRuleHasExceededReportLimit(ruleId: string) {
    const count = this.reportsCountPerRule.get(ruleId);
    if (count == null) return false;
    return count >= this.settings.maxReportsCountPerRule;
  }
}
