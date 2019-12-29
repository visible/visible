import { RuleProgressEmitter } from '../utils/rule-progress-emitter';
import { Report } from './report';
// import { Context } from './context';

// export type Rule = (context: Context) => Promise<Report[]>;

export interface RuleMetadata {
  readonly name: string;
}

export interface Rule {
  meta: RuleMetadata;
  progress: RuleProgressEmitter;
  audit(): Promise<Report[]>;
  countAudits(): Promise<number>;
}
