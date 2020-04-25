import { IsUrl, IsUUID } from 'class-validator';

import { Location } from './location';
import { Source } from './source';

export interface PointerConstructorParams {
  id: string;
  source?: Source;
  location?: Location;
  screenshot?: string;
}

export abstract class Pointer {
  @IsUUID()
  readonly id: string;

  @IsUrl()
  readonly screenshot?: string;

  readonly source?: Source;
  readonly location?: Location;

  constructor(params: PointerConstructorParams) {
    this.id = params.id;
    this.source = params.source;
    this.location = params.location;
    this.screenshot = params.screenshot;
  }
}
