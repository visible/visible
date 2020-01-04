import puppeteer from 'puppeteer';
import { Browser, SetupParams } from '../domain/browser';

export class BrowserPuppeteerImpl implements Browser {
  private browser!: puppeteer.Browser;
  private page!: puppeteer.Page;

  async setup(params: SetupParams) {
    const args: string[] = [];

    if (params.language) {
      args.push(`--lang=${params.language}`);
    }

    if (params.height && params.height) {
      args.push(`--window-size=${params.width},${params.height}`);
    }

    this.browser = await puppeteer.launch({ headless: false, args });
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

  run<T, U extends unknown[]>(fn: (...args: U) => T, args: U) {
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    return this.page.evaluate(fn as any, ...(args as any)) as Promise<T>;
  }

  async registerResolver(
    namespace: RegExp,
    resolver: (path: string) => string,
  ) {
    await this.page.setRequestInterception(true);

    this.page.on('request', req => {
      if (!namespace.test(req.url())) {
        return req.continue();
      }

      const [, path] = req.url().match(namespace) ?? [];

      return req.respond({
        contentType: 'text/javascript',
        body: resolver(path),
      });
    });
  }
}
