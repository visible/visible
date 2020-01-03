import { Config } from '../domain/config';

/**
 * Takes config object and reoslve extends
 * @param baseConfig base configuration object
 */
export function mergeExtends(baseConfig: Config) {
  const extendables: Config[] = [];

  for (const extendable of baseConfig.extends) {
    const config = require(extendable);
    extendables.push(config);
  }

  return extendables.reduce((result, config) => {
    return { ...result, ...config };
  }, baseConfig);
}
