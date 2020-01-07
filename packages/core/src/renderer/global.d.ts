import { Config } from '../shared/config';

declare global {
  interface Window {
    __VISIBLE__: {
      config: Config;
    };
  }
}
