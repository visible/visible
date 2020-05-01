import { ReadStream } from 'fs';

export interface StorageCreateResponse {
  file: string;
}

export interface Storage {
  create(stream: ReadStream): Promise<StorageCreateResponse>;
}
