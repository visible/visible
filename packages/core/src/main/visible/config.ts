import merge from 'deepmerge';
import os from 'os';
import path from 'path';

import { Config } from '../../shared';

const defaultConfig: Config = {
  extends: [],
  plugins: [],
  settings: {
    browser: 'chrome',
    language: 'en',
    delay: 0,
    headless: true,
    noSandbox: false,
    screenshot: 'only-fail',
    screenshotDir: path.join(os.tmpdir(), 'visible'),
  },
};

const loadConfig = (path: string) => require(path).config;

/**
 * Takes config object and resolve extends
 * @param baseConfig base configuration object
 */
export function resolveExtends(baseConfig: Config, configLoader = loadConfig) {
  const extensions = baseConfig.extends ?? [];

  const config = extensions.reduce((result, extendConfig) => {
    return merge(result, configLoader(extendConfig));
  }, baseConfig);

  return merge(config, defaultConfig);
}
