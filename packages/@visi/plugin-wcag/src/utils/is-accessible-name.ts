export const isAccessibleName = (name: unknown): boolean =>
  typeof name === 'string' &&
  name != null &&
  name !== '' &&
  !/^\s+$/.test(name);
