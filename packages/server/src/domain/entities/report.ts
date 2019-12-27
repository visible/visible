export interface Content {
  html?: string;
  xpath?: string;
  css?: string;
}

export interface ContentAPI {
  xpath?: string;
  css?: string;
  html?: string;
}

export type ReportType = 'ok' | 'warn' | 'error';

export interface Report {
  id: string;
  type: ReportType;
  content?: Content;
  message?: string;
}

export interface ReportAPI {
  id: string;
  type: ReportTypeAPI;
  message?: string;
  content: ContentAPI;
}

export enum ReportTypeAPI {
  OK = 'OK',
  WARN = 'WARN',
  ERROR = 'ERROR',
}
