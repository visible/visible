import { id, not, panic } from '../function';

test('id', () => {
  expect(id('hello')).toBe('hello');
});

test('panic', () => {
  expect(() => {
    panic('hello');
  }).toThrow('hello');
});

test('not', () => {
  const isEven = (num: number) => num % 2 === 0;
  expect(not(isEven)(2)).toBe(false);
});
