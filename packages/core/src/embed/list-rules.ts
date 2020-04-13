export const listRules = async () => {
  return window.__VISIBLE_PLUGINS__
    .flatMap(plugin => plugin.rules)
    .map(rule => rule.meta.name);
};

export const processRule = async (name: string) => {
  const Rule = window.__VISIBLE_PLUGINS__
    .flatMap(plugin => plugin.rules)
    .find(rule => rule.meta.name === name);

  if (Rule == null) return;
  const rule = new Rule();
  const reports = await rule.audit();
  return reports;
};
