import { IsOptional, IsUrl, IsUUID, Length } from 'class-validator';

import { validateOrRejectSync } from '../../utils/validate-or-reject-sync';

export interface SourceConstructorParams {
  id: string;
  content: string;
  title?: string;
  url?: string;
}

export class Source {
  @IsUUID()
  readonly id: string;

  readonly content: string;

  @IsOptional()
  @IsUrl()
  readonly url?: string;

  @IsOptional()
  @Length(1, 225)
  readonly title?: string;

  constructor(params: SourceConstructorParams) {
    this.id = params.id;
    this.content = params.content;
    this.title = params.title;
    this.url = params.url;
    validateOrRejectSync(this);
  }
}
