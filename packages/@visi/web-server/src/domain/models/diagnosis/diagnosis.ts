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

  @IsUrl({ require_tld: false })
  @IsOptional()
  readonly screenshot?: string;

  @IsUrl({ require_tld: false })
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
}
