const { defaults } = require('jest-config');

const shared = package => ({
  globals: {
    'ts-jest': {
      tsConfig: `<rootDir>/packages/${package}/tsconfig.json`,
    },
  },
  testMatch: [`<rootDir>/packages/${package}/**/?(*.)spec.ts?(x)`],
  coverageDirectory: '<rootDir>/coverage',
  collectCoverageFrom: [`<rootDir>/${package}/**/*.{ts,tsx}`],
  transform: {
    ...defaults.transform,
    '^.+\\.tsx?$': 'ts-jest',
  },
  moduleFileExtensions: [...defaults.moduleFileExtensions, 'ts', 'tsx'],
});

module.exports = {
  projects: [
    {
      ...shared('core'),
      preset: 'jest-puppeteer',
      setupFilesAfterEnv: ['jest-puppeteer-istanbul/lib/setup'],
      reporters: ['default', 'jest-puppeteer-istanbul/lib/reporter'],
    },
    {
      ...shared('ui'),
      testEnvironment: 'jsdom',
      setupFilesAfterEnv: ['<rootDir>/packages/ui/tests/setup.ts'],
    },
  ],
};
