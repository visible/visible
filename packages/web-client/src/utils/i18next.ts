import NextI18next from 'next-i18next';
import config from 'next/config';

config();

const nextI18next = new NextI18next({
  defaultLanguage: 'en',
  otherLanguages: ['ja'],
  defaultNS: 'web-client',
});

export default nextI18next;
export const { appWithTranslation, useTranslation } = nextI18next;
export * from 'next-i18next';
