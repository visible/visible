import { injectable, unmanaged } from 'inversify';

import { SourceRepository } from '../../../application/repositories';
import { Source } from '../../../domain/models';

@injectable()
export class SourceGatewayMock implements SourceRepository {
  constructor(
    @unmanaged()
    private readonly sources = new Map<string, Source>(),
  ) {}

  async save(source: Source) {
    this.sources.set(source.id, source);
    return source;
  }
}
