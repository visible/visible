import 'dayjs/locale/en';
import 'dayjs/locale/ja';

import dayjs from 'dayjs';
import relativeTime from 'dayjs/plugin/relativeTime';
import NextI18next, { UseTranslation } from 'next-i18next';
import path from 'path';

const nextI18next = new NextI18next({
  defaultLanguage: 'en',
  otherLanguages: ['ja'],
  defaultNS: 'web-client',
  localePath: path.resolve('./public/static/locales'),
  // debug: process.env.NODE_ENV === 'development',
});

dayjs.extend(relativeTime);

nextI18next.i18n.on('initialized', (opt) => {
  dayjs.locale(opt.lng);
});

nextI18next.i18n.on('languageChanged', (lng) => {
  dayjs.locale(lng);
});

export default nextI18next;
export const appWithTranslation = nextI18next.appWithTranslation;
export const useTranslation: UseTranslation = nextI18next.useTranslation;
export const Trans = nextI18next.Trans;
export * from 'next-i18next';
