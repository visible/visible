import {
  Config,
  Driver,
  Plugin,
  Provider,
  ProviderConstructor,
  Rule,
  RuleConstructor,
  Settings,
  Visible,
} from '@visi/core';
import deepmerge from 'deepmerge';
import mkdirp from 'mkdirp';

import { ConfigLoader } from './config';

interface Constructor<T, U> {
  new (params: U): T;
}

const constructIfNewable = <T extends unknown, U>(
  constructorLike: Constructor<T, U> | T,
  params?: U,
): T => {
  if (typeof constructorLike === 'function') {
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    return new (constructorLike as any)(params);
  }

  return constructorLike;
};

export class Engine {
  private static async loadPlugins(names: string[]) {
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
  }

  private static initDriver(
    name: string,
    plugins: Map<string, Plugin>,
    settings: Settings,
  ) {
    const driver = plugins.get(name)?.driver;

    if (driver == null) {
      throw new Error(
        `Driver "${name}" is not loaded. ` +
          `Make sure you have added it to the "plugin" property of the config`,
      );
    }

    return constructIfNewable(driver, settings);
  }

  private static initProvider(
    plugins: Map<string, Plugin>,
    settings: Settings,
  ) {
    return [...plugins.values()]
      .flatMap((plugin) => plugin.provider)
      .filter((value): value is Provider | ProviderConstructor => value != null)
      .map((provider) => constructIfNewable(provider, settings))
      .reduce((a, b) => deepmerge(a, b), {} as Provider);
  }

  private static initRules(plugins: Map<string, Plugin>) {
    return [...plugins.values()]
      .flatMap((plugin) => plugin.rules)
      .filter((value): value is Rule | RuleConstructor => value != null)
      .map((rule) => constructIfNewable(rule));
  }

  constructor(readonly visible: Visible, readonly driver: Driver) {}

  static async init(schema: Config) {
    const config = await ConfigLoader.init(schema);
    const plugins = await this.loadPlugins(config.plugins);

    const { settings } = config;

    if (settings.screenshotDir) {
      await mkdirp(settings.screenshotDir);
    }

    const driverFactory = this.initDriver(config.driver, plugins, settings);
    const rules = this.initRules(plugins);
    const provider = this.initProvider(plugins, settings);

    const driver = await driverFactory.create();

    return new Engine(new Visible(settings, driver, rules, provider), driver);
  }

  down() {
    return this.driver.quit();
  }
}
