import i18nextDefault from 'i18next';
import LanguageDetector from 'i18next-browser-languagedetector';

import en from './locale/en.json';
import ja from './locale/ja.json';

export const i18next = i18nextDefault.createInstance();

export const initI18next = () =>
  i18next.use(LanguageDetector).init({
    defaultNS: 'web-client',
    fallbackLng: 'en',
    resources: {
      en: { 'web-client': en },
      ja: { 'web-client': ja },
    },
  });
