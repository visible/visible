import { Config, Settings } from '@visi/core';
import merge from 'deepmerge';

export class ConfigLoader {
  private static readonly DEFAULT_CONFIG: Required<Config> = {
    extends: [],
    driver: '@visi/plugin-puppeteer',
    plugins: ['@visi/plugin-puppeteer'],
    settings: {},
    providers: [],
    rules: [],
  };

  private constructor(
    readonly driver: string,
    readonly settings: Partial<Settings>,
    readonly plugins: string[] = [],
    readonly providers: string[] = [],
    readonly rules: string[] = [],
  ) {}

  static async init(schema: Config): Promise<ConfigLoader> {
    const config = await this.mergeExtensions(schema);
    return new ConfigLoader(
      config.driver,
      config.settings,
      config.plugins,
      config.providers,
      config.rules,
    );
  }

  private static async mergeExtensions(base: Config) {
    const names = base.extends ?? [];

    // Prior config comes after
    const extensions: Config[] = [base];

    // Load config schemas from their names
    // TODO: Support recursion
    for (const name of names) {
      const extension: Config = await import(name);
      extensions.push(extension);
    }

    // Merge them all
    return extensions.reduce(
      (a, c) => merge(a, c),
      this.DEFAULT_CONFIG,
    ) as Required<Config>;
  }
}
