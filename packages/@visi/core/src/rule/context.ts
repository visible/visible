import { Node as HTML } from 'domhandler';
import { Node as CSS } from 'postcss';

import { Driver } from '../driver';
import { Provider } from '../provider';
import { Settings } from '../settings';
import { Fix, Outcome, SourceType } from '../source';

export interface BaseReportParams {
  sourceId: string;
  ruleId: string;
  outcome: Outcome;
  target: string;
  location?: {
    startLine: number;
    endLine: number;
    startColumn: number;
    endColumn: number;
  };
  message?: string;
  fix?: Fix;
}

export interface HTMLReportParams extends BaseReportParams {
  node: HTML;
  sourceType: SourceType.HTML;
}

export interface CSSReportParams extends BaseReportParams {
  node: CSS;
  sourceType: SourceType.CSS;
}

export type ReportParams = HTMLReportParams | CSSReportParams;

export interface Context {
  readonly driver: Driver;
  readonly settings: Settings;
  readonly provider: Provider;
  report(params: ReportParams): Promise<void>;
}
