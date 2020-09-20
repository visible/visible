import { IsUrl } from 'class-validator';

import { Model } from '../model';

export class Website extends Model {
  @IsUrl({ require_tld: false })
  readonly url!: string;

  @IsUrl({ require_tld: false })
  readonly screenshot!: string;

  readonly title!: string;
}
