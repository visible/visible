export type ReportType = 'ok' | 'warn' | 'error';

export interface Report {
  id: string;
  name: string;
  type: ReportType;
  message?: string;
  xpath?: string;
  css?: string;
  html?: string;
}

export enum ReportTypeAPI {
  OK = 'OK',
  WARN = 'WARN',
  ERROR = 'ERROR',
}

export interface ReportAPI {
  id: string;
  name: string;
  type: ReportTypeAPI;
  message?: string;
  xpath?: string;
  css?: string;
  html?: string;
}
