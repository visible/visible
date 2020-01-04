import i18next from 'i18next';

export const addTranslations = (
  lng: string,
  ns: string,
  resources: unknown,
) => {
  i18next.addResources(lng, ns, resources);
};

export const localize = i18next.init();
