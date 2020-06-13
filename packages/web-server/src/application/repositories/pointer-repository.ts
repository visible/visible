import { Pointer } from '../../domain/models';

export interface PointerRepository {
  save(pointer: Pointer): Promise<Pointer>;
}
