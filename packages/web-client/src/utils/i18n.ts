import i18next from 'i18next';
import LanguageDetector from 'i18next-browser-languagedetector';

import en from '../locale/en.json';
import ja from '../locale/ja.json';

export const createI18n = async (language?: string) => {
  const i18nextCustom = i18next.createInstance();

  const t = await i18nextCustom.use(LanguageDetector).init({
    lng: language,
    defaultNS: 'web-client',
    fallbackLng: 'en',
    resources: {
      en: { 'web-client': en },
      ja: { 'web-client': ja },
    },
  });

  return [i18nextCustom, t] as const;
};
