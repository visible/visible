import { Session } from './session';

export interface Driver {
  open(): Promise<Session>;
  quit(): Promise<void>;
}
