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
