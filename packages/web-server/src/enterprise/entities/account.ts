import { Actor } from './actor';
import { Organization } from './organization';
import { Website } from './website';

export class Account extends Actor {
  constructor(
    readonly id: string,
    readonly name: string,
    readonly websites: Website[],
    readonly email: string,
    readonly organizations: Organization[],
  ) {
    super(id, name, websites);
  }
}
