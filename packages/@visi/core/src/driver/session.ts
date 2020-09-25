import { Node as HTMLNode } from 'domhandler';
import { Node as CSSNode } from 'postcss';

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

export interface Session {
  sources: Map<string, Source>;

  getTitle(): Promise<string>;
  getURL(): Promise<string>;
  resolveURL(path: string): Promise<string>;

  goto(url: string): Promise<void>;
  close(): Promise<void>;

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
