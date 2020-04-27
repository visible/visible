import { CDPSession } from 'puppeteer';

import { Config, Report } from '../../shared';
import { Driver } from '../driver';
import { SourceStore } from '../source-store';

export interface PostProcessorContext {
  readonly config: Config;
  readonly driver: Driver;
  readonly cdp: CDPSession; // experimental
  readonly sourceStore: SourceStore;
}

export interface PostProcessor {
  run(report: Report): Promise<Report>;
}

export interface PostProcessorConstructor {
  new (context: PostProcessorContext): PostProcessor;
}
