import { TFunction } from 'i18next';
import { Config, RuleOption } from '../shared/config';

export interface Context {
  t: TFunction;
  config: Config;
  options: <T extends unknown>(key: string) => RuleOption<T> | undefined;
}

export abstract class BaseRule {
  protected context: Context;

  constructor() {
    this.context = {
      t: (key: string) => key,
      config: window.__VISIBLE_CONFIG__,
      options: this.getOptions,
    };
  }

  protected getOptions<T extends unknown>(rule: string) {
    const { rules } = this.context.config;

    if (!rules) {
      throw new Error('No rule config provided');
    }

    // prettier-ignore
    const entry = Object
      .entries(rules)
      .find(([key]) => key === rule);

    if (!entry) return;
    return entry[1] as RuleOption<T>;
  }
}
