import puppeteer, { LaunchOptions } from 'puppeteer';
import { Settings } from '../shared';
import { Browser, ScriptTagParams } from './browser';

export class BrowserBlinkImpl implements Browser {
  private browser!: puppeteer.Browser;
  private page!: puppeteer.Page;

  async setup(settings: Settings = {}) {
    const args: string[] = [
      '--disable-web-security',
      '--allow-file-access-from-files',
    ];

    if (settings.language) {
      args.push(`--lang=${settings.language}`);
    }

    const options: LaunchOptions = {
      args,
      headless: settings.headless,
    };

    if (settings.height && settings.width) {
      options.defaultViewport = {
        width: settings.width,
        height: settings.height,
      };
    }

    this.browser = await puppeteer.launch(options);
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
}
