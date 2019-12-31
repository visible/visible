import { Report, ReportContent } from './report';
import { Context } from './context';

export interface RuleMetadata {
  readonly name: string;
  readonly description?: string;
  readonly url?: string;
  readonly fixable?: boolean;
  readonly deprecated?: boolean;
}

export interface Rule {
  audit(): Promise<Report[]>;
  fix(content: ReportContent): Promise<ReportContent>;
}

export interface RuleConstructor {
  meta: RuleMetadata;
  new (context: Context): Rule;
}
