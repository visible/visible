import { serialize } from '../serialize';

it('serializes values by JSON', () => {
  const result = serialize`const myObj = ${{ 1: 'Jan', 2: 'Feb', 3: 'Mar' }}`;
  expect(result).toBe(
    `const myObj = JSON.parse('{"1":"Jan","2":"Feb","3":"Mar"}')`,
  );
});

it('serializes values by JSON (end with string)', () => {
  const result = serialize`const myObj = ${{ 1: 'Jan', 2: 'Feb', 3: 'Mar' }};`;
  expect(result).toBe(
    `const myObj = JSON.parse('{"1":"Jan","2":"Feb","3":"Mar"}');`,
  );
});

it('serializes long value', () => {
  const result = serialize`
const a = ${123};
const b = ${345};
const c = ${567};`;

  expect(result).toBe(
    `
const a = JSON.parse('123');
const b = JSON.parse('345');
const c = JSON.parse('567');`,
  );
});
