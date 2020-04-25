import { Report } from './report';

export enum DiagnosisStatus {
  STARTED = 'started',
  PROCESSING = 'processing',
  DONE = 'done',
  FAILED = 'failed',
}

export class Diagnosis {
  constructor(
    readonly id: string,
    readonly status: DiagnosisStatus,
    readonly screenshot: string,
    readonly reports: Report[],
    readonly doneCount: number,
    readonly totalCount: number,
    readonly createdAt: Date,
    readonly updatedAt: Date,
  ) {}
}
