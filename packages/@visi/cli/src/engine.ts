import {
  Config,
  ConfigSchema,
  Driver,
  Plugin,
  Provider,
  ProviderConstructor,
  Rule,
  RuleConstructor,
  Settings,
  Validator,
} from '@visi/core';
import deepmerge from 'deepmerge';
import mkdirp from 'mkdirp';

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
  ): Driver {
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

  constructor(readonly validator: Validator) {}

  static async init(schema: ConfigSchema) {
    const config = await Config.init(schema);
    const plugins = await this.loadPlugins(config.plugins);

    const { settings } = config;

    if (settings.screenshotDir) {
      await mkdirp(settings.screenshotDir);
    }

    const driver = this.initDriver(config.driver, plugins, settings);
    const rules = this.initRules(plugins);
    const provider = this.initProvider(plugins, settings);

    return new Engine(new Validator(settings, driver, rules, provider));
  }

  async beforeRun() {
    await this.validator.driver.launch();
  }

  async afterRun() {
    await this.validator.driver.quit();
  }
}
