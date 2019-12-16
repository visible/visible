import i18next from 'i18next';

import en from '@visi/locale/en/cli.json';
import ja from '@visi/locale/ja/cli.json';

export const createI18n = async (language?: string) => {
  await i18next.init({
    lng: language,
    fallbackLng: 'en',
    resources: {
      en: { cli: en },
      ja: { cli: ja },
    },
  });

  return i18next;
};
