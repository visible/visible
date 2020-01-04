const runRule = async (pluginNames: string[]) => {
  const plugins = [];

  for (const name of pluginNames) {
    const plugin = await import(
      /* webpackIgnore: true */ './plugins_browser/' + name
    );

    plugins.push(plugin.default);
  }

  const rules = plugins.map(plugin => plugin.rules).flat();

  const reports = await Promise.all(
    rules.map(Rule => {
      const rule = new Rule({
        t: (k: string) => k,
      });

      return rule.audit();
    }),
  );

  return reports.flat();
};

// eslint-disable-next-line @typescript-eslint/ban-ts-ignore
// @ts-ignore
window['runRule'] = runRule;
