// This code is largely borrowed from copyable
// https://github.com/andrewbents/copyable

/* eslint-disable no-prototype-builtins, @typescript-eslint/no-explicit-any */
import { getConstructor } from './get-constructor';

type NonFunctionPropertyNames<T> = {
  [K in keyof T]: T[K] extends Function ? never : K;
}[keyof T];
type NonFunctionProperties<T> = Pick<T, NonFunctionPropertyNames<T>>;

type Patch<T> = Partial<NonFunctionProperties<T>>;
type PatchKey<T> = keyof Patch<T>;

type Mapper<V> = (val: V) => V;
type MapPatch<T> = { [K in PatchKey<T>]?: Mapper<T[K]> };

export abstract class Copyable {
  copy(patch?: Patch<this>): this;
  copy<K extends PatchKey<this>>(key: K, val: this[K]): this;
  copy(patchOrKey?: any, val?: any): this {
    if (arguments.length < 2) {
      const constructor = getConstructor(this);
      return Object.assign(new constructor(), this, patchOrKey);
    }

    const copy = this.copy();
    copy[patchOrKey] = val;
    return copy;
  }

  map(patchMap?: MapPatch<this>): this;
  map<K extends PatchKey<this>>(key: K, mapper: Mapper<this[K]>): this;
  map(patchMapOrKey: any, mapper?: any): this {
    const copy = this.copy();

    if (arguments.length === 2) {
      const key = patchMapOrKey;
      copy[key] = mapper(copy[key]);
    } else {
      const patchMap = patchMapOrKey;
      for (const key in patchMap) {
        if (patchMap.hasOwnProperty(key)) {
          copy[key] = patchMap[key](copy[key]);
        }
      }
    }

    return copy;
  }

  equals(other: this | null | undefined): other is this {
    return (
      other != null &&
      (this === other ||
        Object.getOwnPropertyNames(this).every((p) =>
          other[p] instanceof Copyable && this[p] instanceof Copyable
            ? this[p].equals(other[p])
            : other[p] === this[p],
        ))
    );
  }

  toString() {
    return JSON.stringify(this.toJSON(), null, 2);
  }

  toJSON(): NonFunctionProperties<this> {
    return Object.entries(this).reduce<NonFunctionProperties<this>>(
      (acc, [key, value]) => {
        if (typeof this[key] === 'function') return acc;
        acc[key] = value?.toJSON ? value.toJSON() : value;
        return acc;
      },
      {} as NonFunctionProperties<this>,
    );
  }

  abstract afterChange(): void;
}
