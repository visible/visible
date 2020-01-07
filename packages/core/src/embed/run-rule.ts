import { Report } from '../shared';

const runRule = async (paths: string[]) => {
  const plugins = [];
  const reports: Report[] = [];

  for (const path of paths) {
    const plugin = await import(/* webpackIgnore: true */ path);
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

// eslint-disable-next-line @typescript-eslint/ban-ts-ignore
// @ts-ignore
window['runRule'] = runRule;
