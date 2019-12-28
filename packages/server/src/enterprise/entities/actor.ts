import { Website } from './website';

export interface Actor {
  id: string;
  name: string;
  websites: Website[];
}
