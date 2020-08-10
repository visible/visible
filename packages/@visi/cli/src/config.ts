import { Config, createSettings, Settings } from '@visi/core';
import merge from 'deepmerge';

export type ConfigDefaults = Required<Config>;

export class ConfigLoader {
  private static readonly DEFAULT_CONFIG: ConfigDefaults = {
    extends: [],
    driver: '@visi/plugin-puppeteer',
    plugins: ['@visi/plugin-puppeteer'],
    settings: {},
  };

  private constructor(
    readonly driver: string,
    readonly settings: Settings,
    readonly plugins: string[] = [],
  ) {}

  static async init(schema: Config) {
    const config = await this.mergeExtensions(schema);
    return new ConfigLoader(
      config.driver,
      createSettings(config.settings),
      config.plugins,
    );
  }

  private static async mergeExtensions(base: Config) {
    const names = base.extends ?? [];

    // Prior config comes after
    const extensions: Config[] = [base];

    // Load config schemas from their names
    for (const name of names) {
      const extension: Config = await import(name);
      extensions.push(extension);
    }

    // Merge them all
    return extensions.reduce(
      (a, c) => merge(a, c),
      this.DEFAULT_CONFIG,
    ) as ConfigDefaults;
  }
}
