import { IsOptional, IsUrl, IsUUID, MinLength } from 'class-validator';
import { immerable, produce } from 'immer';

import { Model } from '../model';
import { Report } from './report';

export class Source extends Model {
  @IsUUID()
  readonly id!: string;

  @IsUUID()
  readonly diagnosisId!: string;

  @MinLength(1)
  readonly content!: string;

  @IsOptional()
  @IsUrl()
  readonly url?: string;

  readonly reports!: readonly Report[];

  private readonly [immerable] = true;

  appendReports(report: Report[]): Source {
    return produce(this, (draft) => {
      draft.reports.push(...report);
    });
  }
}
