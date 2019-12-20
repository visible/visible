import i18next from 'i18next';

import en from '@visi/locale/en/core.json';
import ja from '@visi/locale/ja/core.json';

export const createI18n = async (language?: string) => {
  const i18nextCustom = i18next.createInstance({
    lng: language,
    fallbackLng: 'en',
    resources: {
      en: { core: en },
      ja: { core: ja },
    },
  });

  const t = await i18nextCustom.init();

  return [i18nextCustom, t] as const;
};
