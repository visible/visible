import { Config } from './config';

export declare global {
  export interface Window {
    __VISIBLE_CONFIG__: Config;
  }
}
