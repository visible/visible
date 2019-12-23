import i18next from 'i18next';
import I18nextCLILanguageDetector from 'i18next-cli-language-detector';

import en from './locales/en.json';
import ja from './locales/ja.json';

export const createI18n = async (language?: string) => {
  const i18nextCustom = i18next.createInstance();

  const t = await i18nextCustom.use(I18nextCLILanguageDetector).init({
    lng: language,
    defaultNS: 'cli',
    fallbackLng: 'en',
    resources: {
      en: { cli: en },
      ja: { cli: ja },
    },
  });

  return [i18nextCustom, t] as const;
};
