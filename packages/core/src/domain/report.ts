export type ReportType = 'ok' | 'warn' | 'error';

export enum ReportLevel {
  OK = 'OK',
  WARN = 'WARN',
  ERROR = 'ERROR',
}

export interface Content {
  readonly html?: string;
  readonly xpath?: string;
  readonly style?: string;
}

export interface Report {
  /** Unique name of the report type (e.g. img-alt) */
  readonly type: string;
  /** Level of the report */
  readonly level: ReportLevel;
  /** Unique name of the rule */
  readonly rule: string;
  /** User-readable message for the report */
  readonly message?: string;
  /** Web content which affected to the report */
  readonly content?: Content;
  /** Way to fix this report (WIP) */
  readonly fix?: () => Promise<Partial<Content>>;
}
