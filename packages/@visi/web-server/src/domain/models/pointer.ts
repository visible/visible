import { IsOptional, IsUrl, IsUUID, Length } from 'class-validator';

import { Location } from './location';
import { Model } from './model';
import { Source } from './source';

export interface BasePointer {
  readonly id: string;
  readonly reportId: string;
  readonly screenshot?: string;
  readonly source?: Source;
  readonly location?: Location;
}

export class HTMLPointer extends Model implements BasePointer {
  @IsUUID()
  readonly id!: string;

  @IsUUID()
  readonly reportId!: string;

  @IsOptional()
  @IsUrl({ require_tld: false })
  readonly screenshot?: string;

  @Length(1, 255)
  readonly xpath!: string;

  readonly source?: Source;
  readonly location?: Location;
}

export class CSSPointer extends Model implements BasePointer {
  @IsUUID()
  readonly id!: string;

  @IsUUID()
  readonly reportId!: string;

  @IsOptional()
  @IsUrl({ require_tld: false })
  readonly screenshot?: string;

  @Length(1, 255)
  readonly xpath!: string;

  @Length(1, 255)
  readonly propertyName!: string;

  readonly source?: Source;
  readonly location?: Location;
}

export type Pointer = HTMLPointer | CSSPointer;
