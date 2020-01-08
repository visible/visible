import { Report } from '../shared';
import { fetchPlugin } from './fetch-plugin';

export const runRule = async (names: string[]) => {
  const plugins = await Promise.all(names.map(name => fetchPlugin(name)));
  const rules = plugins.map(plugin => plugin.rules).flat();

  const reports: Report[] = [];

  for (const Rule of rules) {
    const rule = new Rule();
    const report = await rule.audit();
    reports.push(...report);
  }

  return reports;
};
