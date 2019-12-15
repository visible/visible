import { Page } from 'puppeteer';

export const use = (module: string, page: Page) => {
  return page.addScriptTag({ path: module });
};
