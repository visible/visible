import { IsUrl, IsUUID } from 'class-validator';

import { CSSPointer } from './css-pointer';
import { HTMLPointer } from './html-pointer';
import { Location } from './location';
import { Source } from './source';

export interface BasePointerConstructorParams {
  id: string;
  source?: Source;
  location?: Location;
  screenshot?: string;
}

export abstract class BasePointer {
  @IsUUID()
  readonly id: string;

  @IsUrl()
  readonly screenshot?: string;

  readonly source?: Source;
  readonly location?: Location;

  constructor(params: BasePointerConstructorParams) {
    this.id = params.id;
    this.source = params.source;
    this.location = params.location;
    this.screenshot = params.screenshot;
  }
}

export type Pointer = HTMLPointer | CSSPointer;
