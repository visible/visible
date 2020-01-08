import { runRule } from '../embed';
import { Config } from './config';

export declare global {
  export interface Window {
    __VISIBLE_CONFIG__: Config;
    __VISIBLE_EMBED__: {
      runRule: typeof runRule;
    };
  }
}
