import { Rule } from '../../domain/models';

export interface RuleRepository {
  save(rule: Rule): Promise<Rule>;
  findByName(name: string): Promise<Rule | undefined>;
}
