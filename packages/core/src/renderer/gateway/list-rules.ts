import { ListRules, ProcessRule } from '../../shared/gateway';
import { Rule, RuleConstructor } from '../rule';

export const listRules: ListRules = async () => {
  return window.__VISIBLE_PLUGINS__
    .flatMap(plugin => plugin.rules)
    .map(rule => rule?.id)
    .filter((rule): rule is string => rule != null);
};

const isConstructor = (rule: Rule): rule is RuleConstructor =>
  'constructor' in rule;

export const processRule: ProcessRule = async (id: string) => {
  const _rule = window.__VISIBLE_PLUGINS__
    .flatMap(plugin => plugin.rules)
    .find(rule => rule?.id === id);

  if (_rule == null) {
    throw new Error(`no such rule ${id}`);
  }

  const rule = isConstructor(_rule) ? new _rule() : _rule;
  const reports = await rule.run();
  return reports;
};
