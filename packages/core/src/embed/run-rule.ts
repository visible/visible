const runRule = async (paths: string[]) => {
  const plugins = [];

  for (const path of paths) {
    const plugin = await import(/* webpackIgnore: true */ path);
    plugins.push(plugin.default);
  }

  const rules = plugins.map(plugin => plugin.rules).flat();
  const reports = await Promise.all(rules.map(Rule => new Rule().audit()));

  return reports.flat();
};

// eslint-disable-next-line @typescript-eslint/ban-ts-ignore
// @ts-ignore
window['runRule'] = runRule;
