import { TFunction } from 'i18next';
import { Fixers } from './fixers';

export interface Context {
  readonly fixers?: Fixers;
  readonly t: TFunction;
}
