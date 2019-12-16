import puppeteer from 'puppeteer';
import { i18n } from 'i18next';
import { rules } from './rules';
import { Report } from './domain/report';
import { Fixers } from './domain/fixers';
import { Rule } from './domain/rule';
import { createI18n } from './utils/i18n';
import { Context } from './domain/context';

export interface VisibleParams {
  readonly url?: string;
  readonly html?: string;
  readonly i18n?: i18n;
  readonly language?: string;
  readonly rules?: Rule[];
  readonly fixers?: Fixers;
}

export const visible = async (params: VisibleParams) => {
  const browser = await puppeteer.launch();
  const page = await browser.newPage();

  if (params.url) {
    await page.goto(params.url);
  }

  if (params.html) {
    await page.setContent(params.html);
  }

  const reports: Report[] = [];

  const context: Context = {
    page,
    i18n: params.i18n || (await createI18n(params.language)),
    fixers: params.fixers,
  };

  for (const rule of rules.concat(params.rules || [])) {
    const newReports = await rule(context);
    reports.push(...newReports);
  }

  await page.close();
  await browser.close();

  return reports;
};
