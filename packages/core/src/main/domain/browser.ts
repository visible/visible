export interface SetupParams {
  language?: string;
  width?: number;
  height?: number;
}

export interface Browser {
  run<T, U extends unknown[]>(fn: (...args: U) => T, args: U): Promise<T>;
  openURL(url: string): Promise<void>;
  waitFor(ms: number): Promise<void>;
  setup(params: SetupParams): Promise<void>;
  cleanup(): Promise<void>;
  registerResolver(match: RegExp, fn: (path: string) => string): Promise<void>;
}
