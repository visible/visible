import { Location } from './location';

it('creates instance', () => {
  const location = new Location({
    startLine: 1,
    startColumn: 2,
    endLine: 3,
    endColumn: 4,
  });

  expect(location.startLine).toBe(1);
  expect(location.startColumn).toBe(2);
  expect(location.endLine).toBe(3);
  expect(location.endColumn).toBe(4);
});
