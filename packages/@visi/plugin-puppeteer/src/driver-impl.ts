import { Driver, Session, Settings } from '@visi/core';
import { Browser } from 'puppeteer';

import { SessionImpl } from './session-impl';

export class DriverImpl implements Driver {
  constructor(
    private readonly browser: Browser,
    private readonly settings: Settings,
  ) {}

  async open(): Promise<Session> {
    const page = await this.browser.newPage();
    const cdp = await page.target().createCDPSession();
    return new SessionImpl(this.settings, page, cdp);
  }

  async quit(): Promise<void> {
    await this.browser.close();
  }
}
