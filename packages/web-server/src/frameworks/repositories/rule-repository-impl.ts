import { inject, injectable } from 'inversify';
import { Connection } from 'typeorm';

import { RuleRepository } from '../../application/repositories';
import { Rule } from '../../domain/models';
import { TYPES } from '../../types';
import { RuleORM } from '../entities';

@injectable()
export class RuleRepositoryImpl implements RuleRepository {
  constructor(
    @inject(TYPES.Connection)
    private readonly connection: Connection,
  ) {}

  async save(rule: Rule) {
    return this.connection
      .getRepository(RuleORM)
      .save(RuleORM.fromDomain(rule))
      .then((result) => result.toDomain());
  }

  async findByName(name: string) {
    return this.connection
      .getRepository(RuleORM)
      .findOne({ where: { name } })
      .then((rule) => rule?.toDomain());
  }
}
