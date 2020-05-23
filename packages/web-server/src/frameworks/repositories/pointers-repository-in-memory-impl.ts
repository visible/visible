import { injectable, unmanaged } from 'inversify';

import { PointersRepository } from '../../application/repositories';
import { Pointer } from '../../domain/models';

@injectable()
export class PointersRepositoryInMemoryImpl implements PointersRepository {
  constructor(
    @unmanaged()
    private readonly pointers = new Map<string, Pointer>(),
  ) {}

  async save(pointer: Pointer) {
    this.pointers.set(pointer.id, pointer);
    return pointer;
  }
}
