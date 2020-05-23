import { inject, injectable } from 'inversify';
import { Connection } from 'typeorm';

import { PointersRepository } from '../../application/repositories';
import { Pointer } from '../../domain/models';
import { TYPES } from '../../types';
import { PointerORM } from '../entities';

@injectable()
export class PointersRepositoryImpl implements PointersRepository {
  constructor(
    @inject(TYPES.Connection)
    private connection: Connection,
  ) {}

  async save(pointer: Pointer) {
    return this.connection
      .getRepository(PointerORM)
      .save(PointerORM.fromDomain(pointer))
      .then((result) => result.toDomain());
  }
}
