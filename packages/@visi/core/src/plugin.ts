import { DriverFactory, DriverFactoryConstructor } from './driver';
import { Provider, ProviderConstructor } from './provider';
import { Rule, RuleConstructor } from './rule';

export interface Plugin {
  readonly driver?: DriverFactoryConstructor | DriverFactory;
  readonly provider?: ProviderConstructor | Provider;
  readonly rules?: (Rule | RuleConstructor)[];
}
