import { Node as HTML } from 'domhandler';
import path from 'path';
import * as postcss from 'postcss';
import { Subject } from 'rxjs';

import { Driver } from '../driver';
import { convertIndicesToLocation } from '../indices-to-loc';
import { Provider } from '../provider';
import { Context, ReportParams, Rule } from '../rule';
import { Settings } from '../settings';
import { Report, SourceType } from '../source';
import { Website } from '../website';
import { Progress } from './progress';

export class Validator {
  readonly reports = new Map<string, Report[]>();
  readonly originals = new Map<string, string>();
  readonly context: Context = {
    driver: this.driver,
    settings: this.settings,
    provider: this.provider,
    report: this.report.bind(this),
  };

  private doneCount = 0;
  readonly progress$ = new Subject<Progress>();

  constructor(
    readonly settings: Settings,
    readonly driver: Driver,
    readonly rules: Rule[],
    readonly provider: Provider,
  ) {}

  private getHTMLLocation(node: HTML) {
    const source = this.originals.get('html');
    if (source == null) throw new Error();
    // eslint-disable-next-line @typescript-eslint/no-non-null-assertion
    return convertIndicesToLocation(source, node.startIndex!, node.endIndex!);
  }

  private getCSSLocation(node: postcss.Node) {
    if (!node.source?.start || !node.source?.end) {
      return;
    }

    return {
      startLine: node.source.start.line,
      startColumn: node.source.start.column,
      endLine: node.source.end.line,
      endColumn: node.source.end.column,
    };
  }

  async capture(url: string) {
    const { screenshotDir } = this.settings;

    await this.driver.open(url);
    const screenshot = await this.driver.takeScreenshotForPage({
      type: 'png',
      path: path.join(screenshotDir, Date.now().toString()),
    });

    const website: Website = {
      title: 'idk',
      url: 'idk',
      screenshot,
    };

    return website;
  }

  private async report(params: ReportParams) {
    const { screenshotDir } = this.settings;
    const { sourceId, target } = params;

    const screenshot = await this.driver.takeScreenshotForXPath(target, {
      type: 'png',
      path: path.join(screenshotDir, Date.now().toString()),
    });

    const location =
      params.sourceType === SourceType.HTML
        ? this.getHTMLLocation(params.node)
        : this.getCSSLocation(params.node);

    const report = new Report({
      ...params,
      screenshot,
      location,
    });

    if (report.fix) {
      await report.fix();
    }

    const reports = this.reports.get(sourceId) ?? [];
    if (!this.reports.has(sourceId)) {
      this.reports.set(sourceId, reports);
    }
    reports.push(report);

    this.progress$.next({
      report,
      sourceId,
      doneCount: this.doneCount++,
      totalCount: this.rules.length,
    });
  }

  private async before(url: string) {
    const { delay } = this.settings;

    // Open page
    await this.driver.open(url);

    // Load gateway libs
    await this.driver.addScript({
      path: path.resolve(__dirname, '../gateway/index.js'),
    });
    await this.driver.waitForFunction('() => visible != null');

    if (delay != null) {
      await this.driver.waitFor(delay);
    }

    for (const source of this.driver.getSources()) {
      if (source.type === 'html') {
        this.originals.set(source.id, source.text);
      }

      if (source.type === 'css') {
        this.originals.set(source.id, source.text);
      }
    }
  }

  private async after() {
    await this.driver.close();
  }

  async diagnose(url: string) {
    await this.before(url);

    for (const rule of this.rules) {
      await rule.create(this.context);
    }

    const sources = this.driver.getSources();

    // combine source with reports
    for (const [id, reports] of this.reports.entries()) {
      const source = sources.find((source) => source.id === id);

      if (source == null) {
        throw new Error(`Unknown source ${id} reported`);
      }

      source.reports = reports;
    }

    await this.after();
    return sources;
  }
}
