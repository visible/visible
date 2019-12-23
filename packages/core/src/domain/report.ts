export type ReportType = 'ok' | 'warn' | 'error';

export interface Content {
  html: string;
  xpath: string;
  style: string;
}

export interface Report {
  readonly id: string;
  readonly type: ReportType;
  readonly html?: string;
  readonly message?: string;
  readonly content?: Content;
  readonly fix?: () => Promise<Partial<Content>>;
}
