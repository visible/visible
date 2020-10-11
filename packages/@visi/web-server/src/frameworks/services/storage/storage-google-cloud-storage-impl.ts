import { File, Storage as CloudStorage } from '@google-cloud/storage';
import { inject, injectable } from 'inversify';

import { Storage, StorageCreateResponse } from '../../../domain/services';
import { TYPES } from '../../../types';
import { Config } from '../../config';

@injectable()
export class StorageGoogleCloudStorageImpl implements Storage {
  private readonly storage = new CloudStorage();
  private readonly bucket: string;

  constructor(
    @inject(TYPES.Config)
    private readonly config: Config,
  ) {
    if (this.config.cloudStorage.bucket == null) {
      throw new Error('Bucket name is not set');
    }

    this.bucket = this.config.cloudStorage.bucket;
  }

  async create(path: string): Promise<StorageCreateResponse> {
    const bucket = this.storage.bucket(this.bucket);
    const [file] = await bucket.upload(path);
    return { file: this.createURL(file) };
  }

  /**
   * @see https://cloud.google.com/storage/docs/access-public-data#api-link
   */
  private createURL(file: File) {
    return `https://storage.googleapis.com/${this.bucket}/${file.name}`;
  }
}
