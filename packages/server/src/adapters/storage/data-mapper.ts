import { Repository } from 'typeorm';

/**
 * Port for ORMs
 */
export type DataMapper<T> = Repository<T>;
