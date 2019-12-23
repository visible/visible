export type ReportType = 'ok' | 'warn' | 'error';

export interface Content {
  readonly html?: string;
  readonly xpath?: string;
  readonly style?: string;
}

export interface Report {
  readonly id: string;
  readonly type: ReportType;
  readonly message?: string;
  readonly content?: Content;
  readonly fix?: () => Promise<Partial<Content>>;
}
