import i18nextDefault from 'i18next';
import { LanguageDetector } from 'i18next-express-middleware';
import Backend from 'i18next-node-fs-backend';

export const i18next = i18nextDefault.createInstance();

export const initI18next = () =>
  i18next
    .use(Backend)
    .use(LanguageDetector)
    .init({
      fallbackLng: 'en',
      defaultNS: 'web-server',
      backend: {
        loadPath: '/frameworks/locale/{{lng}}.json',
      },
    });
