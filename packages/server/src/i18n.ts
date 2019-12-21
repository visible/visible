import i18next from 'i18next';
import { LanguageDetector } from 'i18next-express-middleware';

import en from '@visi/locale/en/server.json';
import ja from '@visi/locale/ja/server.json';

export const createI18n = async (language?: string) => {
  const i18nextCustom = i18next.createInstance();

  const t = await i18nextCustom.use(LanguageDetector).init({
    lng: language,
    fallbackLng: 'en',
    resources: {
      en: { cli: en },
      ja: { cli: ja },
    },
  });

  return [i18nextCustom, t] as const;
};
