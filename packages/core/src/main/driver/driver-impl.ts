import { Browser, Page } from 'puppeteer';

import { Serializable } from '../utils/serialize';
import { Driver, ScreenshotParams, ScriptTagParams } from './driver';

export class DriverImpl implements Driver {
  constructor(private readonly browser: Browser, private readonly page: Page) {}

  async close() {
    await this.browser.close();
  }

  getURL() {
    return this.page.url();
  }

  exposeFunction(
    name: string,
    fn: <T extends Serializable[], U extends Serializable>(...args: T) => U,
  ) {
    return this.page.exposeFunction(name, fn);
  }

  async waitForFunction(fn: string) {
    await this.page.waitForFunction(fn);
  }

  async openURL(url: string) {
    await this.page.goto(url);
  }

  run<T>(code: string) {
    return this.page.evaluate(code) as Promise<T>;
  }

  async addScriptTag(options: ScriptTagParams) {
    await this.page.addScriptTag(options);
  }

  getTitle() {
    return this.page.title();
  }

  waitFor(ms: number) {
    return this.page.waitFor(ms);
  }

  async takeScreenshotForPage(params: ScreenshotParams) {
    await this.page.screenshot(params);
  }

  async takeScreenshotForXpath(xpath: string, params: ScreenshotParams) {
    const [elementHandle] = await this.page.$x(xpath);

    if (elementHandle == null) {
      throw new Error(`No element found for xpath ${xpath}`);
    }

    await elementHandle.screenshot(params);
  }
}
