import puppeteer from 'puppeteer';
import { Browser, SetupParams, ScriptTagParams } from '../domain/browser';

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

    this.browser = await puppeteer.launch({ headless: params.headless, args });
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

  run<T>(code: string) {
    return this.page.evaluate(code) as Promise<T>;
  }

  async addScriptTag(options: ScriptTagParams) {
    await this.page.addScriptTag(options);
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
