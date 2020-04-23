import { Serializable } from '../utils/serialize';

export interface ScriptTagParams {
  url?: string;
  path?: string;
  content?: string;
  type?: string;
}

export interface ScreenshotParams {
  path?: string;
  type?: 'jpeg' | 'png';
}

export type SerializableFunction = <
  T extends Serializable[],
  U extends Serializable
>(
  ...args: T
) => U | Promise<U> | void;

export interface Driver {
  getURL(): string;
  getTitle(): Promise<string>;
  addScriptTag(params: ScriptTagParams): Promise<void>;
  exposeFunction(name: string, fn: SerializableFunction): Promise<void>;
  run<T>(code: string): Promise<T>;
  openURL(url: string): Promise<void>;
  close(): Promise<void>;
  waitFor(ms: number): Promise<void>;
  waitForFunction(fn: string): Promise<void>;
  takeScreenshotForPage(params?: ScreenshotParams): Promise<void>;
  takeScreenshotForXpath(
    xpath: string,
    params?: ScreenshotParams,
  ): Promise<void>;
}
