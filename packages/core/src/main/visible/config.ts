import merge from 'deepmerge';

import { Config } from '../../shared';

const loadConfig = (path: string) => require(path).config;

/**
 * Takes config object and resolve extends
 * @param baseConfig base configuration object
 */
export function resolveExtends(baseConfig: Config, configLoader = loadConfig) {
  const extendConfigs = baseConfig.extends ?? [];

  return extendConfigs.reduce((result, extendConfig) => {
    return merge(result, configLoader(extendConfig));
  }, baseConfig);
}
