export const addTranslations = (
  lng: string,
  ns: string,
  resources: unknown,
) => {
  window.__VISIBLE_I18NEXT_ADD_RESOURCES__(lng, ns, resources);
};

export const t = window.__VISIBLE_I18NEXT_T__;
