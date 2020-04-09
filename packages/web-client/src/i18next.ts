import NextI18next from 'next-i18next';
import config from 'next/config';

config();

const nextI18next = new NextI18next({
  defaultLanguage: 'en',
  otherLanguages: ['ja'],
  defaultNS: 'common',
  localePath: 'public/static/locales',
});

export default nextI18next;
export const { useTranslation } = nextI18next;
