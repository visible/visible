import { Node as HTMLNode } from 'domhandler';
import { Node as CSSNode } from 'postcss';

import { Settings } from '../settings';
import { Source } from '../source';

export interface AddScriptParams {
  url?: string;
  path?: string;
  content?: string;
  type?: string;
}

export interface RunScriptParams {
  content?: string;
  path?: string;
}

export interface ScreenshotParams {
  path?: string;
  type?: 'jpeg' | 'png';
}

export interface Driver {
  sources: Map<string, Source>;

  // browser
  launch(): Promise<void>;
  quit(): Promise<void>;

  // page
  open(url: string): Promise<void>;
  close(): Promise<void>;

  // utils
  addScript(params: AddScriptParams): Promise<void>;
  runScript<T>(params: string | RunScriptParams): Promise<T>;
  waitFor(ms: number): Promise<void>;
  waitForFunction(func: string): Promise<void>;
  takeScreenshotForPage(params: ScreenshotParams): Promise<string>;
  takeScreenshotForXPath(
    xpath: string,
    params: ScreenshotParams,
  ): Promise<string>;

  // depot
  findHTML(xpath: string): Promise<[string, HTMLNode] | undefined>;
  findCSS(
    xpath: string,
    propertyName: string,
  ): Promise<[string, CSSNode] | undefined>;
}

export interface DriverConstructor {
  new (config: Settings): Driver;
}
