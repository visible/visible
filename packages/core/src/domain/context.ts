import { Page } from 'puppeteer';
import { i18n } from 'i18next';
import { Fixers } from './fixers';

export interface Context {
  readonly page: Page;
  readonly fixers?: Fixers;
  readonly i18n: i18n;
}
