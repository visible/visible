import { Settings } from '../shared';

export interface ScriptTagParams {
  url?: string;
  path?: string;
  content?: string;
  type?: string;
}

export interface Browser {
  addScriptTag(params: ScriptTagParams): Promise<void>;
  run<T>(code: string): Promise<T>;
  openURL(url: string): Promise<void>;
  waitFor(ms: number): Promise<void>;
  setup(settings?: Settings): Promise<void>;
  cleanup(): Promise<void>;
  registerResolver(match: RegExp, fn: (path: string) => string): Promise<void>;
}
