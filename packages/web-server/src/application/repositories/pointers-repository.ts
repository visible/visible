import { Pointer } from '../../domain/models';

export interface PointersRepository {
  save(pointer: Pointer): Promise<Pointer>;
}
