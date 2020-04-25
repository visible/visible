import { Length } from 'class-validator';

import { validateOrRejectSync } from '../../utils/validate-or-reject-sync';
import { Pointer, PointerConstructorParams } from './pointer';

interface HTMLPointerConstructorParams extends PointerConstructorParams {
  xpath: string;
}

export class HTMLPointer extends Pointer {
  @Length(1, 255)
  readonly xpath: string;

  constructor(params: HTMLPointerConstructorParams) {
    super({
      id: params.id,
      source: params.source,
      location: params.location,
      screenshot: params.screenshot,
    });

    this.xpath = params.xpath;
    validateOrRejectSync(this);
  }
}
