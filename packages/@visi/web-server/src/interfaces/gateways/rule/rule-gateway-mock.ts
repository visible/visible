import { injectable, unmanaged } from 'inversify';

import { RuleRepository } from '../../../application/repositories';
import { Rule } from '../../../domain/models';

@injectable()
export class RuleGatewayMock implements RuleRepository {
  constructor(
    @unmanaged()
    private readonly rules = new Map<string, Rule>(),
  ) {}

  async save(rule: Rule): Promise<Rule> {
    this.rules.set(rule.id, rule);
    return rule;
  }

  async findByName(name: string): Promise<Rule | undefined> {
    return [...this.rules.values()].find((rule) => rule.name === name);
  }

  async findOne(id: string): Promise<Rule | undefined> {
    return [...this.rules.values()].find((rule) => rule.id === id);
  }
}
