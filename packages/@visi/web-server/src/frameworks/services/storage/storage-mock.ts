import { ReadStream } from 'fs';
import { injectable } from 'inversify';

import { Storage, StorageCreateResponse } from '../../../domain/services';

@injectable()
export class StorageMock implements Storage {
  async create(_stream: ReadStream): Promise<StorageCreateResponse> {
    return { file: 'https://example.com' };
  }
}
