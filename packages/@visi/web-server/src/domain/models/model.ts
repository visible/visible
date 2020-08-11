import { immerable } from 'immer';

interface Newable<T> {
  new (): T;
}

type PropertyNameOf<T> = {
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  [K in keyof T]: T[K] extends () => any
    ? never
    : K extends typeof immerable
    ? never
    : K;
}[keyof T];

export type JustProps<T> = Pick<T, PropertyNameOf<T>>;

export abstract class Model {
  readonly [immerable] = true;

  static from<T>(this: Newable<T>, params: JustProps<T>): T {
    const instance = new this();

    for (const [key, value] of Object.entries(params)) {
      instance[key] = value;
    }

    return instance;
  }
}
