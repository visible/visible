import { Config } from '../main/domain/config';

declare global {
  interface Window {
    __VISIBLE__: {
      config: Config;
    };
  }
}

export abstract class BaseRule {
  protected config: Config;

  constructor() {
    this.config = window.__VISIBLE__.config;
  }
}
