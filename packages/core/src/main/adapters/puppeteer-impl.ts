import puppeteer from 'puppeteer';
import { Browser } from '../domain/browser';

declare global {
  interface Window {
    visibleCoreIifeStore?: string[];
  }
}

export class BrowserPuppeteerImpl implements Browser {
  private browser!: puppeteer.Browser;
  private page!: puppeteer.Page;

  async setup() {
    this.browser = await puppeteer.launch();
    this.page = await this.browser.newPage();
  }

  async cleanup() {
    await this.page.close();
    await this.browser.close();
  }

  async waitFor(ms: number) {
    await this.page.waitFor(ms);
  }

  async openURL(url: string) {
    await this.page.goto(url);
  }

  async installIIFE(name: string, path: string) {
    await this.page.addScriptTag({ path });
    await this.page.evaluate((name: string) => {
      if (!window.visibleCoreIifeStore) window.visibleCoreIifeStore = [];
      window.visibleCoreIifeStore.push(name);
    }, name);
  }

  async getIIFE() {
    const list = await this.page.evaluate(() => window.visibleCoreIifeStore);
    return list ?? [];
  }

  run<T, U extends unknown[]>(fn: (...args: U) => T, args: U) {
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    return this.page.evaluate(fn as any, ...(args as any)) as Promise<T>;
  }
}
