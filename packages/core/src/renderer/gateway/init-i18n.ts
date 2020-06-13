import i18next from 'i18next';

export const initI18n = (lng?: string) => {
  window.__VISIBLE_T__ = (key: string, defaultValue?: string) => {
    return i18next.t(key, defaultValue);
  };

  window.__VISIBLE_ADD_TRANSLATIONS = (
    lng: string,
    ns: string,
    resources: unknown,
  ) => {
    return i18next.addResourceBundle(lng, ns, resources);
  };

  return i18next.init({
    lng,
    defaultNS: 'core',
    fallbackLng: 'en',
  });
};
