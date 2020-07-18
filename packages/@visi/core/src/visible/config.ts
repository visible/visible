import merge from 'deepmerge';

import { createSettings, Settings } from '../settings';

export interface ConfigSchema {
  readonly driver?: string;
  readonly extends?: string[];
  readonly plugins?: string[];
  readonly settings?: Partial<Settings>;
}

export type SchemaWithDefaults = Required<ConfigSchema>;

export class Config {
  private static readonly DEFAULT_CONFIG: SchemaWithDefaults = {
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

  static async init(schema: ConfigSchema) {
    const config = await this.mergeExtensions(schema);
    return new Config(
      config.driver,
      createSettings(config.settings),
      config.plugins,
    );
  }

  private static async mergeExtensions(base: ConfigSchema) {
    const names = base.extends ?? [];

    // Prior config comes after
    const extensions: ConfigSchema[] = [base];

    // Load config schemas from their names
    for (const name of names) {
      const extension: ConfigSchema = await import(name);
      extensions.push(extension);
    }

    // Merge them all
    return extensions.reduce(
      (a, c) => merge(a, c),
      this.DEFAULT_CONFIG,
    ) as SchemaWithDefaults;
  }
}
