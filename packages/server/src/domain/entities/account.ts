import { Actor, ActorAPI } from './actor';
import { Organization } from './organization';

export interface Account extends Actor {
  email: string;
  organizations: Organization[];
}

export type AccountAPI = ActorAPI;

export interface CredentialAPI extends ActorAPI {
  email: string;
}
