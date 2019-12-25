import i18next from 'i18next';
import LanguageDetector from 'i18next-browser-languagedetector';

import en from '../locales/en.json';
import ja from '../locales/ja.json';

export const createI18n = async (language?: string) => {
  const i18nextCustom = i18next.createInstance();

  const t = await i18nextCustom.use(LanguageDetector).init({
    lng: language,
    defaultNS: 'client',
    fallbackLng: 'en',
    resources: {
      en: { client: en },
      ja: { client: ja },
    },
  });

  return [i18nextCustom, t] as const;
};