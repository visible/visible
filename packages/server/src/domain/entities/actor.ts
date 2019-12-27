import { Website, WebsiteAPI } from './website';

export interface Actor {
  id: string;
  name: string;
  websites: Website[];
}

export interface ActorAPI {
  id: string;
  name: string;
  websites: WebsiteAPI[];
}
