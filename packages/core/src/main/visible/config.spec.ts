import { resolveExtends } from './config';

const fakeConfigLoader = (path: string) => {
  switch (path) {
    case 'plugin-a':
      return { rules: { 'rule-a': { level: 'ok' } } };
    case 'plugin-b':
      return { rules: { 'rule-b': { level: 'ok' } } };
    case 'plugin-c':
      return { rules: { 'rule-c': { level: 'ok' } } };
  }
};

it('resolves `extends` property of config', () => {
  const result = resolveExtends(
    {
      extends: ['plugin-a', 'plugin-b', 'plugin-c'],
    },
    fakeConfigLoader,
  );

  expect(result).toEqual(
    expect.objectContaining({
      extends: ['plugin-a', 'plugin-b', 'plugin-c'],
      rules: {
        'rule-a': {
          level: 'ok',
        },
        'rule-b': {
          level: 'ok',
        },
        'rule-c': {
          level: 'ok',
        },
      },
    }),
  );
});
