import puppeteer from 'puppeteer';
import { Settings } from '../shared';
import { Browser, ScriptTagParams } from './browser';

export class BrowserBlinkImpl implements Browser {
  private browser!: puppeteer.Browser;
  private page!: puppeteer.Page;

  async setup(settings: Settings = {}) {
    const args: string[] = [];

    if (settings.language) {
      args.push(`--lang=${settings.language}`);
    }

    if (settings.height && settings.width) {
      args.push(`--window-size=${settings.width},${settings.height}`);
    }

    this.browser = await puppeteer.launch({
      headless: settings.headless,
      args,
    });

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
