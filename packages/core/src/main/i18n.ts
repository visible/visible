import i18next from 'i18next';

export const createI18n = async (language = 'en') => {
  const i18nextCustom = i18next.createInstance();

  const t = await i18nextCustom.init({
    lng: language,
    defaultNS: 'core',
    fallbackLng: 'en',
  });

  return [i18nextCustom, t] as const;
};
