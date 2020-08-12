import { validateOrReject } from 'class-validator';
import { inject, injectable } from 'inversify';
import { Connection } from 'typeorm';

import { RuleRepository } from '../../../application/repositories';
import { Rule } from '../../../domain/models';
import { TYPES } from '../../../types';
import { RuleTable } from './rule-table';

@injectable()
export class RuleGateway implements RuleRepository {
  constructor(
    @inject(TYPES.Connection)
    private readonly connection: Connection,
  ) {}

  async save(rule: Rule): Promise<Rule> {
    await validateOrReject(rule);
    return this.connection
      .getRepository(RuleTable)
      .save(RuleTable.fromDomain(rule))
      .then((result) => result.toDomain());
  }

  async findByName(name: string): Promise<Rule | undefined> {
    return this.connection
      .getRepository(RuleTable)
      .findOne({ where: { name } })
      .then((rule) => rule?.toDomain());
  }
}