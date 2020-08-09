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

it('creates instance by indices', () => {
  const target = `abc def
ghi jkl
mno pqr`;

  const indices = [12, 19] as const;
  const location = Location.fromIndices(target, ...indices);

  // cspell: disable-next-line
  expect(location.startLine).toBe(2);
  expect(location.startColumn).toBe(5);
  expect(location.endLine).toBe(3);
  expect(location.endColumn).toBe(4);
});
