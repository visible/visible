import { Settings } from '../settings';

export interface Config {
  readonly driver?: string;
  readonly extends?: string[];
  readonly plugins?: string[];
  readonly settings?: Partial<Settings>;
  readonly providers?: string[];
  readonly rules?: string[];
}
