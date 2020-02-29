import { NormalizedCacheObject } from 'apollo-cache-inmemory';

declare global {
  export interface Window {
    __APOLLO_STATE__: NormalizedCacheObject;
  }
}
