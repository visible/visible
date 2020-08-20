import { Rule } from '../../domain/models';

export interface RuleRepository {
  save(rule: Rule): Promise<Rule>;
  findOne(id: string): Promise<Rule | undefined>;
  findByName(name: string): Promise<Rule | undefined>;
}
