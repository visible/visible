import i18next, { TFunction } from 'i18next';
import { Config } from './config';

export declare global {
  export interface Window {
    __VISIBLE_CONFIG__: Config;
    __VISIBLE_EMBED__: unknown;
    __VISIBLE_I18NEXT_ADD_RESOURCES__: typeof i18next.addResources;
    __VISIBLE_I18NEXT_T__: TFunction;
  }
}
