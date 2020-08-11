import { validateOrReject } from 'class-validator';
import { inject, injectable } from 'inversify';
import { Connection } from 'typeorm';

import { PointerRepository } from '../../../application/repositories';
import { Pointer } from '../../../domain/models';
import { TYPES } from '../../../types';
import { PointerTable } from './pointer-table';

@injectable()
export class PointersGateway implements PointerRepository {
  constructor(
    @inject(TYPES.Connection)
    private connection: Connection,
  ) {}

  async save(pointer: Pointer): Promise<Pointer> {
    await validateOrReject(pointer);
    return this.connection
      .getRepository(PointerTable)
      .save(PointerTable.fromDomain(pointer))
      .then((result) => result.toDomain());
  }
}
