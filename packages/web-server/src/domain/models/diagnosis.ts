import { IsEnum, IsInt, IsUrl, IsUUID, Min } from 'class-validator';

import { Model } from './model';
import { Report } from './report';

export enum Status {
  STARTED = 'started',
  PROCESSING = 'processing',
  DONE = 'done',
  FAILED = 'failed',
}

export class Diagnosis extends Model {
  @IsUUID()
  readonly id!: string;

  @IsEnum(Status)
  readonly status!: Status;

  @IsUrl({ require_tld: false })
  readonly screenshot!: string;

  @IsUrl({ require_tld: false })
  readonly url!: string;

  @Min(0)
  @IsInt()
  readonly doneCount!: number;

  @Min(0)
  @IsInt()
  readonly totalCount!: number;

  readonly reports!: Report[];
  readonly createdAt!: Date;
  readonly updatedAt!: Date;
}
