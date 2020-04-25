import { Location } from './location';
import { Pointer } from './pointer';
import { Source } from './source';

export class CSSPointer extends Pointer {
  constructor(
    readonly id: string,
    readonly xpath: string,
    readonly propertyName: string,
    readonly source?: Source,
    readonly location?: Location,
    readonly screenshot?: string,
  ) {
    super(id, source, location, screenshot);
  }
}
