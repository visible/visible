export enum ReportType {
  OK = 'OK',
  WARN = 'WARN',
  ERROR = 'ERROR',
}

export class Report {
  constructor(
    readonly name: string,
    readonly diagnosisId: string,
    readonly type: ReportType,
    readonly message?: string,
    readonly xpath?: string,
    readonly css?: string,
    readonly html?: string,
  ) {}
}
