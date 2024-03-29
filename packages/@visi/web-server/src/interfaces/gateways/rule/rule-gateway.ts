import { validateOrReject } from 'class-validator';
import { inject, injectable } from 'inversify';
import { Connection } from 'typeorm';

import { RuleRepository } from '../../../application/repositories';
import { Rule } from '../../../domain/models';
import { TYPES } from '../../../types';
import { RuleDBEntity } from './rule-db-entity';

@injectable()
export class RuleGateway implements RuleRepository {
  update = this.save;

  constructor(
    @inject(TYPES.Connection)
    private readonly connection: Connection,
  ) {}

  async save(rule: Rule): Promise<Rule> {
    await validateOrReject(rule);
    return this.connection
      .getRepository(RuleDBEntity)
      .save(RuleDBEntity.fromDomain(rule))
      .then((result) => result.toDomain());
  }

  async findByCoreId(coreId: string): Promise<Rule | undefined> {
    return this.connection
      .getRepository(RuleDBEntity)
      .findOne({ where: { coreId } })
      .then((rule) => rule?.toDomain());
  }

  async findOne(id: string): Promise<Rule | undefined> {
    return this.connection
      .getRepository(RuleDBEntity)
      .findOne({ where: { id } })
      .then((rule) => rule?.toDomain());
  }
}
