export type ReportLevel = 'ok' | 'warn' | 'error';

export interface ReportContent {
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
  readonly content?: ReportContent;
  /** Way to fix this report (WIP) */
  readonly fix?: () => Promise<Partial<ReportContent>>;
}
