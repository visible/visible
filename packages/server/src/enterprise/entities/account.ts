import { Actor } from './actor';
import { Organization } from './organization';

export interface Account extends Actor {
  email: string;
  organizations: Organization[];
}
