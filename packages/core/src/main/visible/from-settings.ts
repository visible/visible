import { LaunchOptions } from 'puppeteer';

import { Settings } from '../../shared';

export const createLaunchOptionsFromSettings = (settings: Settings) => {
  const options: LaunchOptions = {
    args: ['--disable-web-security'],
    headless: settings.headless ?? true,
  };

  if (settings.executablePath) {
    options.executablePath = settings.executablePath;
  }

  if (settings.noSandbox) {
    options.args?.push('--no-sandbox', '--disable-setuid-sandbox');
  }

  if (settings.language) {
    options.args?.push(`--lang=${settings.language}`);
  }

  if (settings.height && settings.width) {
    options.defaultViewport = {
      width: settings.width,
      height: settings.height,
    };
  }

  return options;
};
