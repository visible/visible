import { Actor, ActorAPI } from './actor';
import { Account } from './account';
import { Website } from './website';

export interface Organization extends Actor {
  members: Account[];
  websites: Website[];
}

export type OrganizationAPI = ActorAPI;
