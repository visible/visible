import i18nextDefault from 'i18next';

export const i18next = i18nextDefault.createInstance();

export const initI18next = (lng: string) =>
  i18next.init({
    lng,
    defaultNS: 'core',
    fallbackLng: 'en',
  });
