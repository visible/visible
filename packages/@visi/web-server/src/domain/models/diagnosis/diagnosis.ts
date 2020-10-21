import {
  IsDate,
  IsEnum,
  IsInt,
  IsOptional,
  IsUrl,
  IsUUID,
  Min,
} from 'class-validator';
import { castDraft, immerable, produce } from 'immer';

import { Model } from '../model';
import { Source } from './source';

export enum Status {
  QUEUED = 'queued',
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

  @IsUrl()
  @IsOptional()
  readonly screenshot?: string;

  @IsUrl()
  readonly url!: string;

  @Min(0)
  @IsInt()
  readonly doneCount!: number;

  @Min(0)
  @IsInt()
  readonly totalCount!: number;

  @IsDate()
  readonly createdAt!: Date;

  @IsDate()
  readonly updatedAt!: Date;

  @IsInt()
  readonly waitingCountAtCreation!: number;

  @IsInt()
  readonly completeCountAtCreation!: number;

  readonly sources!: readonly Source[];
  private readonly [immerable] = true;

  setStatus(status: Status): Diagnosis {
    return produce(this, (draft) => {
      draft.status = status;
    });
  }

  setScreenshot(url: string): Diagnosis {
    return produce(this, (draft) => {
      draft.screenshot = url;
    });
  }

  setURL(url: string): Diagnosis {
    return produce(this, (draft) => {
      draft.url = url;
    });
  }

  setUpdatedAt(date: Date): Diagnosis {
    return produce(this, (draft) => {
      draft.updatedAt = date;
    });
  }

  setDoneCount(count: number): Diagnosis {
    return produce(this, (draft) => {
      draft.doneCount = count;
    });
  }

  setTotalCount(count: number): Diagnosis {
    return produce(this, (draft) => {
      draft.totalCount = count;
    });
  }

  setSources(sources: readonly Source[]): Diagnosis {
    return produce(this, (draft) => {
      draft.sources = castDraft(sources);
    });
  }

  getWaitingCountAhead(completeCount: number): number {
    /*
      [ completed ] [       waiting    ] ... 1
      [ completed      ] [    waiting  ] ... 2
      ==> n(queuesAhead) = waiting_1 - (completed_2 - completed_1)
    */
    const result =
      this.waitingCountAtCreation -
      (completeCount - this.completeCountAtCreation);
    return Math.max(0, result);
  }
}
