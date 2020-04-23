import { promises as fs } from 'fs';
import path from 'path';
import { Page, Request } from 'puppeteer';

import { ModuleServer } from './module-server';

export class ModuleServerImpl implements ModuleServer {
  constructor(
    private readonly page: Page,
    private readonly field = 'browser',
  ) {}

  private handleRequest = async (req: Request) => {
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
    const filePath = require.resolve(
      path.join(pathname, packageJson[this.field]),
    );

    // read file
    const file = await fs.readFile(filePath, 'utf-8');
    req.respond({ contentType: 'text/javascript', body: file });
  };

  async listen() {
    await this.page.setRequestInterception(true);
    this.page.on('request', this.handleRequest);
  }

  async end() {
    await this.page.setRequestInterception(false);
    this.page.off('request', this.handleRequest);
  }
}
