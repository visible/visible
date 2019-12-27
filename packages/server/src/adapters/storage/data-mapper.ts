/**
 * Port for ORMs
 */
export interface DataMapper<T> {
  findOne(id: string): Promise<T | undefined>;
  findByIds(id: string[]): Promise<T[]>;
  save(data: T): Promise<T>;
  delete(id: string): Promise<unknown>;
}
