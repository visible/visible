import { Node as HTML } from 'domhandler';
import { Node as CSS } from 'postcss';

import { Driver } from '../driver';
import { Provider } from '../provider';
import { Settings } from '../settings';
import { Fix, Outcome } from '../source';

export interface ReportParams {
  sourceId: string;
  ruleId: string;
  node: HTML | CSS;
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

export interface Context {
  readonly driver: Driver;
  readonly settings: Settings;
  readonly provider: Provider;
  report(params: ReportParams): Promise<void>;
}
