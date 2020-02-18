import { promises as fs } from 'fs';
import path from 'path';
import puppeteer, { LaunchOptions } from 'puppeteer';

import { Settings } from '../shared';
import { Browser, ScriptTagParams } from './browser';

export class BrowserPuppeteerImpl implements Browser {
  private browser: puppeteer.Browser | undefined = undefined;
  private page: puppeteer.Page | undefined = undefined;

  async setup(settings: Settings = {}) {
    const options: LaunchOptions = {
      args: ['--disable-web-security'],
      headless: settings.headless ?? true,
    };

    if (settings.language) {
      options.args?.push(`--lang=${settings.language}`);
    }

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
    await this.page?.close();
    await this.browser?.close();
  }

  async waitFor(ms: number) {
    await this.page?.waitFor(ms);
  }

  async openURL(url: string) {
    await this.page?.goto(url);
  }

  run<T>(code: string) {
    return this.page?.evaluate(code) as Promise<T>;
  }

  async addScriptTag(options: ScriptTagParams) {
    await this.page?.addScriptTag(options);
  }

  async exposeFunction(name: string, fn: (...args: unknown[]) => unknown) {
    await this.page?.exposeFunction(name, fn);
  }

  async serveModule(field = 'browser') {
    await this.page?.setRequestInterception(true);

    this.page?.on('request', async req => {
      const url = new URL(req.url());

      if (url.hostname !== 'localhost') {
        return req.continue();
      }

      // e.g. `@visi/plugin-standard`
      const pathname = url.pathname.replace(/^\//, '');

      // `@visi/plugin-standard/package.json`
      const packageJsonPath = require.resolve(pathname + '/package.json');
      const packageJson = require(packageJsonPath);

      // @visi/plugin-standard/dist/renderer.js
      const filePath = require.resolve(path.join(pathname, packageJson[field]));
      const file = await fs.readFile(filePath, 'utf-8');

      req.respond({ contentType: 'text/javascript', body: file });
    });
  }
}
