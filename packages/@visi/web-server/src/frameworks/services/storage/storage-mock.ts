import { ReadStream } from 'fs';
import { injectable } from 'inversify';

import { Storage } from '../../../domain/services';

@injectable()
export class StorageMock implements Storage {
  async create(_stream: ReadStream) {
    return { file: 'https://example.com' };
  }
}
