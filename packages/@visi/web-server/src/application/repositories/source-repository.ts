import { Source } from '../../domain/models';

export interface SourceRepository {
  save(source: Source): Promise<Source>;
}
