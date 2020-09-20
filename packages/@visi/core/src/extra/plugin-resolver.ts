import deepmerge from 'deepmerge';

import { DriverFactory } from '../driver';
import { Provider, ProviderConstructor } from '../provider';
import { Rule, RuleConstructor } from '../rule';
import { createSettings, Settings } from '../settings';
import { Plugin } from '.';
import { constructIfNewable } from './construct-if-newable';

export class PluginResolver {
  readonly plugins: Map<string, Plugin>;
  readonly settings: Settings;

  constructor(plugins: Map<string, Plugin>, baseSettings: Partial<Settings>) {
    this.plugins = plugins;
    this.settings = createSettings(baseSettings);
  }

  getDriverFactory(name: string): DriverFactory {
    const driverFactory = this.plugins.get(name)?.driver;

    if (driverFactory == null) {
      throw new Error(`No driver named ${name} to the plugins`);
    }

    return constructIfNewable(driverFactory, this.settings);
  }

  getRules(names: string[]): Rule[] {
    return names
      .flatMap((rule) => this.plugins.get(rule)?.rules)
      .filter((rule): rule is Rule | RuleConstructor => rule != null)
      .map((rule) => constructIfNewable(rule));
  }

  getProvider(names: string[]): Provider {
    return names
      .flatMap((provider) => this.plugins.get(provider)?.provider)
      .filter((value): value is Provider | ProviderConstructor => value != null)
      .map((provider) => constructIfNewable(provider, this.settings))
      .reduce((a, b) => deepmerge(a, b), {} as Provider); // TODO: Use chain of responsibility
  }
}
