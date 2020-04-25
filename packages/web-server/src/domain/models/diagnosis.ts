import { IsEnum, IsInt, IsUrl, IsUUID, Min } from 'class-validator';

import { validateOrRejectSync } from '../../utils/validate-or-reject-sync';
import { Report } from './report';

export enum Status {
  STARTED = 'started',
  PROCESSING = 'processing',
  DONE = 'done',
  FAILED = 'failed',
}

interface DiagnosisConstructorParams {
  id: string;
  status: Status;
  screenshot: string;
  url: string;
  reports: Report[];
  doneCount: number;
  totalCount: number;
  createdAt: Date;
  updatedAt: Date;
}

export class Diagnosis {
  @IsUUID()
  readonly id: string;

  @IsEnum(Status)
  readonly status: Status;

  @IsUrl()
  readonly screenshot: string;

  @IsUrl()
  readonly url: string;

  @Min(0)
  @IsInt()
  readonly doneCount: number;

  @Min(0)
  @IsInt()
  readonly totalCount: number;

  readonly reports: Report[];
  readonly createdAt: Date;
  readonly updatedAt: Date;

  constructor(params: DiagnosisConstructorParams) {
    this.id = params.id;
    this.status = params.status;
    this.screenshot = params.screenshot;
    this.url = params.url;
    this.doneCount = params.doneCount;
    this.totalCount = params.totalCount;
    this.reports = params.reports;
    this.createdAt = params.createdAt;
    this.updatedAt = params.updatedAt;
    validateOrRejectSync(this);
  }
}
