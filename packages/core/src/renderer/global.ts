import { Config } from '../shared/config';
import { PluginBrowser } from './plugin';

export type TFunction = (key: string, defaultValue?: string) => string;

export type AddTranslations = (
  lng: string,
  ns: string,
  resource: unknown,
) => void;

declare global {
  export interface Window {
    __VISIBLE_PLUGINS__: PluginBrowser[];
    __VISIBLE_CONFIG__: Config;
    __VISIBLE_GATEWAY__: unknown;
    __VISIBLE_T__: TFunction;
    __VISIBLE_ADD_TRANSLATIONS: AddTranslations;
  }
}
