import { convertIndicesToLocation } from './convert-indices-to-location';

test('Converts indices to location', () => {
  // select from "jkl" at the 2nd line to "mno" at the 3rd line
  const target = `abc def
ghi jkl
mno pqr`;

  const indices = [12, 19] as const;
  const result = convertIndicesToLocation(target, ...indices);

  // cspell: disable-next-line
  expect(target.slice(...indices)).toBe('jkl\nmno');
  expect(result).toEqual({
    startLine: 2,
    startColumn: 5,
    endLine: 3,
    endColumn: 4,
  });
});
