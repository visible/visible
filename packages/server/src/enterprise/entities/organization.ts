import { Actor } from './actor';
import { Account } from './account';
import { Website } from './website';

export class Organization extends Actor {
  constructor(
    readonly id: string,
    readonly name: string,
    readonly websites: Website[],
    readonly members: Account[],
  ) {
    super(id, name, websites);
  }
}
