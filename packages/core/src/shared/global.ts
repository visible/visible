import { Config } from './config';
import { PluginBrowser } from './plugin';

export interface TFunction {
  (key: string): Promise<string>;
  (key: string, defaultValue: string): Promise<string>;
}

export type AddTranslations = (
  lng: string,
  ns: string,
  resource: unknown,
) => Promise<void>;

declare global {
  export interface Window {
    __VISIBLE_PLUGINS__: PluginBrowser[];
    __VISIBLE_CONFIG__: Config;
    __VISIBLE_EMBED__: unknown;
    __VISIBLE_T__: TFunction;
    __VISIBLE_ADD_TRANSLATIONS__: AddTranslations;
  }
}
