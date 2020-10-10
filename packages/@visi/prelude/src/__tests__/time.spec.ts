import { delay, timeout } from '../time';

test('timeout', () => {
  expect(timeout(delay(200), 100)).rejects.toThrow();
});

test('timeout', () => {
  expect(timeout(delay(100), 200)).resolves.toBeUndefined();
});
