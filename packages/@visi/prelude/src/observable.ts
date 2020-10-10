import { Observable } from 'rxjs';

type Queue<T> = ((resolve: IteratorResult<T, unknown>) => void)[];

export function toAsyncIterator<T>(
  stream$: Observable<T>,
): AsyncIterableIterator<T> {
  const queue: Queue<T> = [];
  const yields: T[] = [];

  const subscription = stream$.subscribe((value) => {
    const resolve = queue.shift();

    if (resolve == null) {
      yields.push(value);
      return;
    }

    resolve({
      value,
      done: false,
    });
  });

  return {
    next() {
      if (yields.length > 0) {
        const value = yields.shift();
        if (value != null) {
          return Promise.resolve({
            value,
            done: false,
          });
        }
      }

      if (subscription.closed) {
        return Promise.resolve({ value: undefined, done: true });
      }

      return new Promise((resolve) => {
        queue.push(resolve);
      });
    },
    return(value: T) {
      subscription.unsubscribe();
      return Promise.resolve({ value, done: true });
    },
    throw(error: Error) {
      subscription.unsubscribe();
      return Promise.reject(error);
    },
    [Symbol.asyncIterator]() {
      return this;
    },
  };
}
