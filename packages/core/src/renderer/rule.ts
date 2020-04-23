import { Report, RuleMetadata } from '../shared';

export type Run = () => Promise<Report[]>;

export interface RuleObject extends RuleMetadata {
  readonly run: Run;
}

export interface RuleClass {
  run: Run;
}

export interface RuleConstructor extends RuleMetadata {
  new (): RuleClass;
}

export type Rule = RuleObject | RuleConstructor;
