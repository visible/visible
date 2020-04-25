import { Location } from './location';
import { Source } from './source';

export abstract class Pointer {
  constructor(
    readonly id: string,
    readonly source?: Source,
    readonly location?: Location,
    readonly screenshot?: string,
  ) {}
}
