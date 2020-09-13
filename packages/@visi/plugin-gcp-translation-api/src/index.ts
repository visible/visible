import { v2 } from '@google-cloud/translate';
import { Plugin } from '@visi/core';

const translate = new v2.Translate();

export default {
  provider: {
    async textToLanguage(text: string) {
      const [result] = await translate.detect(text);
      return result.language;
    },
  },
} as Plugin;
