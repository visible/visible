import { RuleConstructor } from './rule';

export interface Plugin {
  rules: RuleConstructor[];
}
