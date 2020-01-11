export enum ReportLevel {
  OK = 'OK',
  WARN = 'WARN',
  ERROR = 'ERROR',
}

export class Report {
  constructor(
    readonly id: string,
    readonly name: string,
    readonly diagnosisId: string,
    readonly level: ReportLevel,
    readonly message?: string,
    readonly xpath?: string,
    readonly css?: string,
    readonly html?: string,
  ) {}
}
