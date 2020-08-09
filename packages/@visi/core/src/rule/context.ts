import { Node as HTMLNode } from 'domhandler';
import path from 'path';
import { Node as CSSNode } from 'postcss';
import { Subject } from 'rxjs';

import { Driver } from '../driver';
import { Provider } from '../provider';
import { Settings } from '../settings';
import {
  CSSReport,
  CSSSource,
  HTMLReport,
  HTMLSource,
  Location,
  Report,
  ReportConstructorParams,
} from '../source';
import { Progress } from './progress';
import { Rule } from './rule';

export type ReportParams<Node> = Omit<
  ReportConstructorParams,
  'location' | 'screenshot'
> & { node: Node };

export interface Context {
  readonly progress$: Subject<Progress>;
  readonly driver: Driver;
  readonly settings: Settings;
  readonly provider: Provider;
  reportHTML(sourceId: string, params: ReportParams<HTMLNode>): Promise<void>;
  reportCSS(sourceId: string, params: ReportParams<CSSNode>): Promise<void>;
}

export class ContextImpl implements Context {
  private doneCount = 0;
  readonly progress$ = new Subject<Progress>();

  constructor(
    readonly settings: Settings,
    readonly driver: Driver,
    readonly rules: Rule[],
    readonly provider: Provider,
  ) {}

  async reportHTML(sourceId: string, params: ReportParams<HTMLNode>) {
    const { node } = params;
    const source = this.driver.sources.get(sourceId);

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
    const screenshot = await this.takeScreenshot(params.target);

    const report = new HTMLReport({
      ...params,
      location,
      screenshot,
    });

    const newSource = source.addReport(report);
    this.driver.sources.set(newSource.id, newSource);
    this.handleNewReport(report, newSource.id);
  }

  async reportCSS(sourceId: string, params: ReportParams<CSSNode>) {
    const source = this.driver.sources.get(sourceId);
    const { node } = params;

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

    const screenshot = await this.takeScreenshot(params.target);

    const report = new CSSReport({
      ...params,
      location,
      screenshot,
    });

    const newSource = source.addReport(report);
    this.driver.sources.set(newSource.id, newSource);
    this.handleNewReport(report, newSource.id);
  }

  private takeScreenshot(target: string) {
    const { screenshotDir } = this.settings;
    return this.driver.takeScreenshotForXPath(target, {
      type: 'png',
      path: path.join(screenshotDir, Date.now().toString()),
    });
  }

  private handleNewReport(report: Report, sourceId: string) {
    this.progress$.next({
      report,
      sourceId,
      doneCount: this.doneCount++,
      totalCount: this.rules.length,
    });
  }
}
