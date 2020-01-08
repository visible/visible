import { serialize } from '../serialize';

it('serializes values by JSON', () => {
  const result = serialize`const myobj = ${{ 1: 'Jan', 2: 'Feb', 3: 'Mar' }}`;
  expect(result).toBe(
    `const myobj = JSON.parse("{"1":"Jan","2":"Feb","3":"Mar"}")`,
  );
});
