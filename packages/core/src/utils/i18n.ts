import i18next from 'i18next';

import en from '../locale/en.json';
import ja from '../locale/ja.json';

export const createI18n = async (language?: string) => {
  const i18nextCustom = i18next.createInstance();
  const t = await i18nextCustom.init({
    lng: language,
    defaultNS: 'core',
    fallbackLng: 'en',
    resources: {
      en: { core: en },
      ja: { core: ja },
    },
  });

  return [i18nextCustom, t] as const;
};
