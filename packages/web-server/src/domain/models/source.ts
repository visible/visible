import { IsOptional, IsUrl, IsUUID, Length } from 'class-validator';

import { Model } from './model';

export class Source extends Model {
  @IsUUID()
  readonly id!: string;

  @IsUUID()
  readonly pointerId!: string;

  readonly content!: string;

  @IsOptional()
  @IsUrl()
  readonly url?: string;

  @IsOptional()
  @Length(1, 225)
  readonly title?: string;
}
