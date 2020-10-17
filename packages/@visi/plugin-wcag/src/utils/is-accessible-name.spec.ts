import { isAccessibleName } from './is-accessible-name';

it('returns true for accessible name', () => {
  expect(isAccessibleName('accessible')).toBe(true);
});

it('returns false for null', () => {
  expect(isAccessibleName(null)).toBe(false);
});

it('returns false for whitespace', () => {
  expect(isAccessibleName(' ')).toBe(false);
});

it('returns false for empty string', () => {
  expect(isAccessibleName('')).toBe(false);
});
