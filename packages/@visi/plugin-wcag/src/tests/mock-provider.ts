import { Provider } from '@visi/core';

export const echoProvider: Provider = {
  async textToLanguage(_text: string): Promise<string> {
    return 'en';
  },

  async imageToText(_url: string): Promise<string> {
    return 'caption';
  },
};
