import { Config } from './domain/config';

/**
 * Takes config object and reoslve extends
 * @param baseConfig base configuration object
 */
export function resolveExtends(baseConfig: Config) {
  const extendables = baseConfig.extends ?? [];

  return extendables.reduce((result, extendable) => {
    return { ...result, ...require(extendable).config };
  }, baseConfig);
}
