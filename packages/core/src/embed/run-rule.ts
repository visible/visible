import { Report } from '../shared';
import { fetchPlugin } from './fetch-plugin';

export const runRule = async (names: string[]) => {
  const reportProgress = window.__VISIBLE_PROGRESS_REPORTER__;
  const plugins = await Promise.all(names.map(name => fetchPlugin(name)));
  const rules = plugins.map(plugin => plugin.rules).flat();

  const reports: Report[] = [];

  const totalRules = rules.length;
  let doneRules = 0;

  for (const Rule of rules) {
    const rule = new Rule();
    const report = await rule.audit();
    await reportProgress(doneRules / totalRules);
    doneRules++;
    reports.push(...report);
  }

  return reports;
};
