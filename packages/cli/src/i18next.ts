import i18nextDefault from 'i18next';
import I18nextCLILanguageDetector from 'i18next-cli-language-detector';

// import Backend from 'i18next-node-fs-backend';
import en from './locale/en.json';
import ja from './locale/ja.json';

export const i18next = i18nextDefault.createInstance();

export const initI18next = () =>
  i18next.use(I18nextCLILanguageDetector).init({
    defaultNS: 'cli',
    fallbackLng: 'en',
    resources: {
      ja: { cli: ja },
      en: { cli: en },
    },
  });
