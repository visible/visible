import { IsUrl } from 'class-validator';

import { Model } from '../model';

export class Website extends Model {
  @IsUrl()
  readonly url!: string;

  @IsUrl()
  readonly screenshot!: string;

  readonly title!: string;
}
