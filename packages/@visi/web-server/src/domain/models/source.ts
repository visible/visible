import { IsOptional, IsUrl, IsUUID, Length } from 'class-validator';

import { Model } from './model';

export class Source extends Model {
  @IsUUID()
  readonly id!: string;

  @IsUUID()
  readonly pointerId!: string;

  @IsOptional()
  @IsUrl()
  readonly url?: string;

  @IsOptional()
  @Length(1, 225)
  readonly title?: string;

  readonly content!: string;
}
