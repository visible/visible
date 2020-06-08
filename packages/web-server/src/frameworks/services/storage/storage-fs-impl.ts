import { createWriteStream, ReadStream } from 'fs';
import { inject, injectable } from 'inversify';
import path from 'path';
import { fromEvent } from 'rxjs';

import { Storage, StorageCreateResponse } from '../../../domain/services';
import { TYPES } from '../../../types';
import { Config } from '../../config';

@injectable()
export class StorageFsImpl implements Storage {
  constructor(
    @inject(TYPES.Config)
    private readonly config: Config,
  ) {}

  create(stream: ReadStream) {
    return new Promise<StorageCreateResponse>((resolve) => {
      // TODO: file extension support
      const fileName = Date.now().toString() + '.png';
      const pathName = path.join(this.config.static.dir, fileName);
      const writer = createWriteStream(pathName);

      fromEvent(stream, 'data').subscribe((data) => {
        writer.write(data);
      });

      fromEvent(stream, 'end').subscribe(() => {
        const url = `${this.config.getStaticUrl()}/${fileName}`;
        resolve({ file: url });
      });
    });
  }
}
