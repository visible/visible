import path from 'path';

import { Driver } from '../driver';
import { Settings } from '../settings';
import { Website } from '../website';

export class Capturer {
  constructor(readonly settings: Settings, readonly driver: Driver) {}

  async capture(url: string): Promise<Website> {
    const { delay, screenshotDir } = this.settings;

    const session = await this.driver.open();
    await session.goto(url);
    if (delay != null) await session.waitFor(delay);

    const screenshot = await session.takeScreenshotForPage({
      type: 'png',
      path: path.join(screenshotDir, Date.now().toString()),
    });

    return {
      title: await session.getTitle(),
      url: await session.getURL(),
      screenshot,
    };
  }
}
