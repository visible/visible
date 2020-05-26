import { inject, injectable } from 'inversify';
import { Connection } from 'typeorm';

import { SourceRepository } from '../../../application/repositories';
import { Source } from '../../../domain/models';
import { TYPES } from '../../../types';
import { SourceTable } from './source-table';

@injectable()
export class SourceGateway implements SourceRepository {
  constructor(
    @inject(TYPES.Connection)
    private connection: Connection,
  ) {}

  async save(source: Source) {
    return this.connection
      .getRepository(SourceTable)
      .save(SourceTable.fromDomain(source))
      .then((result) => result.toDomain());
  }
}
