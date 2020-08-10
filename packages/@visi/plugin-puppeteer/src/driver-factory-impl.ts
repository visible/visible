import { DriverFactory, Settings } from '@visi/core';
import { launch, LaunchOptions } from 'puppeteer';

import { DriverImpl } from './driver-impl';

export class DriverFactoryImpl implements DriverFactory {
  constructor(private readonly settings: Settings) {}

  async create() {
    const options = this.createLaunchOptions();
    const browser = await launch(options);
    return new DriverImpl(browser, this.settings);
  }

  private createLaunchOptions() {
    const options: LaunchOptions = {
      args: ['--disable-web-security'],
      headless: this.settings.headless ?? true,
    };

    if (this.settings.noSandbox) {
      options.args?.push('--no-sandbox', '--disable-setuid-sandbox');
    }

    if (this.settings.language) {
      options.args?.push(`--lang=${this.settings.language}`);
    }

    if (this.settings.height && this.settings.width) {
      options.defaultViewport = {
        width: this.settings.width,
        height: this.settings.height,
      };
    }

    return options;
  }
}
