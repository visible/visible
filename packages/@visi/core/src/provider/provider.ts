import { Settings } from '../settings';

// Experimental
export interface Provider {
  imageToText?(url: string): Promise<string>;
  textToLanguage?(text: string): Promise<string>;
}

export interface ProviderConstructor {
  new (config: Settings): Provider;
}
