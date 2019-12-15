import { Page } from 'puppeteer';
import { Fixers } from './fixers';

export interface Context {
  readonly page: Page;
  readonly fixers?: Fixers;
}
