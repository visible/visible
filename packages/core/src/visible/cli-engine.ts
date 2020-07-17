import deepmerge from 'deepmerge';
import mkdirp from 'mkdirp';

import { Plugin } from '../plugin';
import { Provider, ProviderConstructor } from '../provider';
import { Rule, RuleConstructor } from '../rule';
import { Settings } from '../settings';
import { Config, ConfigSchema } from './config';
import { Validator } from './validator';

interface Constructor<T, U> {
  new (params: U): T;
}

const constructIfNewable = <T extends {}, U>(
  constructorLike: Constructor<T, U> | T,
  params?: U,
) => {
  if (typeof constructorLike === 'function') {
    // eslint-disable-next-line @typescript-eslint/ban-ts-ignore
    // @ts-ignore
    return new constructorLike(params);
  }

  return constructorLike;
};

const loadPlugins = async (names: string[]) => {
  const plugins = new Map<string, Plugin>();

  for (const name of names) {
    const module = await import(name);

    // CommonJS' default export
    if (module.default != null) {
      plugins.set(name, module.default);
    }
    // ESM
    else {
      plugins.set(name, module);
    }
  }

  return plugins;
};

const initDriver = (
  name: string,
  plugins: Map<string, Plugin>,
  settings: Settings,
) => {
  const driver = plugins.get(name)?.driver;

  if (driver == null) {
    throw new Error(
      `Driver "${name}" is not loaded. ` +
        `Make sure you have added it to the "plugin" property of the config`,
    );
  }

  return constructIfNewable(driver, settings);
};

const initProvider = (plugins: Map<string, Plugin>, settings: Settings) => {
  return [...plugins.values()]
    .flatMap((plugin) => plugin.provider)
    .filter((value): value is Provider | ProviderConstructor => value != null)
    .map((provider) => constructIfNewable(provider, settings))
    .reduce((a, b) => deepmerge(a, b), {} as Provider);
};

const initRules = (plugins: Map<string, Plugin>) => {
  return [...plugins.values()]
    .flatMap((plugin) => plugin.rules)
    .filter((value): value is Rule | RuleConstructor => value != null)
    .map((rule) => constructIfNewable(rule));
};

export const init = async (schema: ConfigSchema) => {
  const config = await Config.init(schema);
  const plugins = await loadPlugins(config.plugins);

  const { settings } = config;

  if (settings.screenshotDir) {
    await mkdirp(settings.screenshotDir);
  }

  const driver = initDriver(config.driver, plugins, settings);
  const rules = initRules(plugins);
  const provider = initProvider(plugins, settings);

  return new Validator(settings, driver, rules, provider);
};
