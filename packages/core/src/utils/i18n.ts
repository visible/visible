import i18next from 'i18next';

import en from '@visi/locale/en/core.json';
import ja from '@visi/locale/ja/core.json';

export const createI18n = async (language?: string) => {
  await i18next.init({
    lng: language,
    fallbackLng: 'en',
    resources: {
      en: { core: en },
      ja: { core: ja },
    },
  });

  return i18next;
}
