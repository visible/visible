import { Length } from 'class-validator';

import { validateOrRejectSync } from '../../utils/validate-or-reject-sync';
import { BasePointer, BasePointerConstructorParams } from './base-pointer';

export interface CSSPointerConstructorParams
  extends BasePointerConstructorParams {
  readonly xpath: string;
  readonly propertyName: string;
}

export class CSSPointer extends BasePointer {
  @Length(1, 255)
  readonly xpath: string;

  @Length(1, 255)
  readonly propertyName: string;

  constructor(params: CSSPointerConstructorParams) {
    super({
      id: params.id,
      source: params.source,
      location: params.location,
      screenshot: params.screenshot,
    });

    this.xpath = params.xpath;
    this.propertyName = params.propertyName;
    validateOrRejectSync(this);
  }
}
