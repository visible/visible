import { Config } from './config';
import { RuleConstructor } from './rule';

export interface PluginMain {
  config: Config;
}

export interface PluginBrowser {
  rules: RuleConstructor[];
}
