import { Settings } from '../shared';
import { Serializable } from './serialize';

export interface ScriptTagParams {
  url?: string;
  path?: string;
  content?: string;
  type?: string;
}

export type AnyFunction = (
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  ...args: any[]
) => Serializable | Promise<Serializable> | void;
export type Declarable = Serializable | AnyFunction;

export interface Browser {
  addScriptTag(params: ScriptTagParams): Promise<void>;
  run<T>(code: string): Promise<T>;
  openURL(url: string): Promise<void>;
  waitFor(fn: string): Promise<void>;
  setup(settings?: Settings): Promise<void>;
  cleanup(): Promise<void>;
  serveModule(): Promise<void>;
  declare(store: { [key: string]: Declarable }): Promise<void>;
}
