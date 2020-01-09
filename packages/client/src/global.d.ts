import { NormalizedCacheObject } from 'apollo-cache-inmemory';

declare global {
  export interface Window {
    __APOLLO_STATE__: NormalizedCacheObject;
  }
}

declare module '*.gql';
declare module '*.json';
declare module '*.yml';
declare module '*.png';
declare module '*.jpg';
declare module '*.jpeg';
declare module '*.gif';
declare module '*.ttf';
declare module '*.otf';
declare module '*.eot';
declare module '*.svg';
declare module '*.woff';
declare module '*.woff2';

declare module '@visi/schema' {
  const typeDefs: string;
  export default typeDefs;
}
