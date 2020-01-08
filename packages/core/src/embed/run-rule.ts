import { Report } from '../shared';

interface RunRuleParams {
  moduleResolverHost: string;
}

export const runRule = async (pluginNames: string[], params: RunRuleParams) => {
  const plugins = [];
  const reports: Report[] = [];
  const paths = pluginNames.map(name => {
    const url = new URL(params.moduleResolverHost);
    url.pathname = name;
    return url.href;
  });

  for (const path of paths) {
    const plugin = await import(path);
    plugins.push(plugin.default);
  }

  const rules = plugins.map(plugin => plugin.rules).flat();

  for (const Rule of rules) {
    const rule = new Rule();
    const report = await rule.audit();
    reports.push(report);
  }

  return reports.flat();
};
