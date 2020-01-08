import merge from 'deepmerge';
import { Config } from '../shared/config';

const loadConfig = (path: string) => require(path).config;

/**
 * Takes config object and reoslve extends
 * @param baseConfig base configuration object
 */
export function resolveExtends(baseConfig: Config, configLoader = loadConfig) {
  const extendables = baseConfig.extends ?? [];

  return extendables.reduce((result, extendable) => {
    return merge(result, configLoader(extendable));
  }, baseConfig);
}
