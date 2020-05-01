import { injectable, unmanaged } from 'inversify';

import { RuleRepository } from '../../application/repositories';
import { Rule } from '../../domain/models';

@injectable()
export class RuleRepositoryInMemoryImpl implements RuleRepository {
  constructor(
    @unmanaged()
    private readonly rules = new Map<string, Rule>(),
  ) {}

  async save(rule: Rule) {
    this.rules.set(rule.id, rule);
    return rule;
  }

  async findByName(name: string) {
    return [...this.rules.values()].find((rule) => rule.name === name);
  }
}
