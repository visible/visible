import { validateSync } from 'class-validator';

import { Copyable } from '../../utils/copyable';

interface Newable<T> {
  new (): T;
}

type PropertyNameOf<T> = {
  [K in keyof T]: T[K] extends Function ? never : K;
}[keyof T];

export type JustProps<T> = Pick<T, PropertyNameOf<T>>;

const isObject = (x: unknown): x is Record<string, unknown> =>
  typeof x === 'object' && x !== null;

const validateOrRejectSync = (target: unknown) => {
  if (!isObject(target)) return;
  const errors = validateSync(target);
  if (errors.length > 0) throw errors;
};

export abstract class Model extends Copyable {
  static from<T>(this: Newable<T>, params: JustProps<T>) {
    const instance = new this();

    for (const [key, value] of Object.entries(params)) {
      instance[key] = value;
    }

    validateOrRejectSync(instance);
    return instance;
  }

  afterChange() {
    validateOrRejectSync(this);
  }
}
