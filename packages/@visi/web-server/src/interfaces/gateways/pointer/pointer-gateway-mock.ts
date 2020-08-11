import { injectable, unmanaged } from 'inversify';

import { PointerRepository } from '../../../application/repositories';
import { Pointer } from '../../../domain/models';

@injectable()
export class PointerGatewayMock implements PointerRepository {
  constructor(
    @unmanaged()
    private readonly pointers = new Map<string, Pointer>(),
  ) {}

  async save(pointer: Pointer): Promise<Pointer> {
    this.pointers.set(pointer.id, pointer);
    return pointer;
  }
}
