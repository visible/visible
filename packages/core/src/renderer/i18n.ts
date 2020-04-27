export const t = (key: string, defaultValue?: string) => {
  return window.__VISIBLE_T__(key, defaultValue);
};

export const addTranslations = (lng: string, ns: string, resource: unknown) => {
  return window.__VISIBLE_ADD_TRANSLATIONS(lng, ns, resource);
};
