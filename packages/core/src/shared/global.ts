import { TFunctionResult, TFunctionKeys, TOptions, StringMap } from 'i18next';
import { Config } from './config';

export interface TFunctionPromise {
  // basic usage
  <
    TResult extends TFunctionResult = string,
    TKeys extends TFunctionKeys = string,
    TInterpolationMap extends object = StringMap
  >(
    key: TKeys | TKeys[],
    options?: TOptions<TInterpolationMap> | string,
  ): Promise<TResult>;
  // overloaded usage
  <
    TResult extends TFunctionResult = string,
    TKeys extends TFunctionKeys = string,
    TInterpolationMap extends object = StringMap
  >(
    key: TKeys | TKeys[],
    defaultValue?: string,
    options?: TOptions<TInterpolationMap> | string,
  ): Promise<TResult>;
}

declare global {
  export interface Window {
    __VISIBLE_CONFIG__: Config;
    __VISIBLE_EMBED__: unknown;
    __VISIBLE_I18NEXT_T__: TFunctionPromise;
    __VISIBLE_I18NEXT_ADD_RESOURCES__: (
      lng: string,
      ns: string,
      resource: unknown,
    ) => Promise<void>;
  }
}
