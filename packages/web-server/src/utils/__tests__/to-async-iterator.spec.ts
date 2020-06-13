import { from, Subject } from 'rxjs';

import { toAsyncIterator } from '../to-async-iterator';

it('coverts observable to an async iterator', async () => {
  const ob$ = new Subject<number>();
  const itr = toAsyncIterator(ob$);

  process.nextTick(() => {
    ob$.next(1);
    ob$.complete();
  });

  const res = await itr.next();
  expect(res.value).toBe(1);
  expect(res.done).toBe(false);
});

it('coverts complex observable', async () => {
  const array = Array.from({ length: 10 }, (_, i) => i);
  const obs$ = from(array);
  const itr = toAsyncIterator(obs$);

  for (const value of array) {
    const result = await itr.next();
    expect(result.value).toBe(value);
    expect(result.done).toBe(false);
  }

  const result = await itr.next();
  expect(result.value).toBeUndefined();
  expect(result.done).toBe(true);
});

it('finishes with the specified value', async () => {
  const ob$ = new Subject<number>();
  const itr = toAsyncIterator(ob$);
  const res = await itr.return?.('foo');
  expect(res?.value).toBe('foo');
  expect(res?.done).toBe(true);
});

it('rejects with the specified value', () => {
  const ob$ = new Subject<number>();
  const itr = toAsyncIterator(ob$);
  expect(itr.throw?.('foo')).rejects.toBe('foo');
});
