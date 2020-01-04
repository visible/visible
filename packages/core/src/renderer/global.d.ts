import { Config } from '../main/domain/config';

declare global {
  interface Window {
    __VISIBLE__: {
      config: Config;
    };
  }
}
