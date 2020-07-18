import { Driver, DriverConstructor } from './driver';
import { Provider, ProviderConstructor } from './provider';
import { Rule, RuleConstructor } from './rule';

export interface Plugin {
  readonly driver?: DriverConstructor | Driver;
  readonly provider?: ProviderConstructor | Provider;
  readonly rules?: (Rule | RuleConstructor)[];
}
