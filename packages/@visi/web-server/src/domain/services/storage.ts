export interface StorageCreateResponse {
  file: string;
}

export interface Storage {
  create(source: string): Promise<StorageCreateResponse>;
}
