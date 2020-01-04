import { Rule } from './rule';
import { Config } from './config';

export interface PluginMain {
  config: Config;
}

export interface PluginBrowser {
  rules: Rule[];
}
