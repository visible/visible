import NextI18next, { UseTranslation } from 'next-i18next';
import config from 'next/config';

config();

const nextI18next = new NextI18next({
  defaultLanguage: 'en',
  otherLanguages: ['ja'],
  defaultNS: 'web-client',
});

export default nextI18next;
export const appWithTranslation = nextI18next.appWithTranslation;
export const useTranslation: UseTranslation = nextI18next.useTranslation;
export const Trans = nextI18next.Trans;
export * from 'next-i18next';
