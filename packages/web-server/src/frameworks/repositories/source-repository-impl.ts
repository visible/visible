import { inject, injectable } from 'inversify';
import { Connection } from 'typeorm';

import { SourceRepository } from '../../application/repositories';
import { Source } from '../../domain/models';
import { TYPES } from '../../types';
import { SourceORM } from '../entities';

@injectable()
export class SourceRepositoryImpl implements SourceRepository {
  constructor(
    @inject(TYPES.Connection)
    private connection: Connection,
  ) {}

  async save(source: Source) {
    return this.connection
      .getRepository(SourceORM)
      .save(SourceORM.fromDomain(source))
      .then((result) => result.toDomain());
  }
}
