import { Page } from 'puppeteer';
import { TFunction } from 'i18next';
import { Fixers } from './fixers';

export interface Context {
  readonly page: Page;
  readonly fixers?: Fixers;
  readonly t: TFunction;
}
