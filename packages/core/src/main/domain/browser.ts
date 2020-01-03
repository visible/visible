export interface Browser {
  run<T, U extends unknown[]>(fn: (...args: U) => T, args: U): Promise<T>;
  installIIFE(name: string, path: string): Promise<void>;
  getIIFE(): Promise<string[]>;
  openURL(url: string): Promise<void>;
  waitFor(ms: number): Promise<void>;
  setup(): Promise<void>;
  cleanup(): Promise<void>;
}
