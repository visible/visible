import i18next from 'i18next';

import enCore from '@visi/locale/en/core.json';
import enCli from '@visi/locale/en/cli.json';

import jaCore from '@visi/locale/ja/core.json';
import jaCli from '@visi/locale/ja/cli.json';

export const createI18n = async (language?: string) => {
  await i18next.init({
    lng: language,
    fallbackLng: 'en',
    resources: {
      en: { cli: enCli, core: enCore },
      ja: { cli: jaCli, core: jaCore },
    },
  });

  return i18next;
};
