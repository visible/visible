const { defaults } = require('jest-config');

const shared = package => ({
  displayName: package,

  transform: {
    ...defaults.transform,
    '^.+\\.tsx?$': 'ts-jest',
  },

  globals: {
    'ts-jest': {
      tsConfig: `<rootDir>/packages/${package}/tsconfig.json`,
    },
  },

  testMatch: [`<rootDir>/packages/${package}/src/**/*.spec.{ts,tsx}`],
  testPathIgnorePatterns: [...defaults.testPathIgnorePatterns, '/dist/'],

  coveragePathIgnorePatterns: [
    ...defaults.coveragePathIgnorePatterns,
    '/dist/',
    '.*\\.spec\\.tsx?',
    '.*\\.stories\\.tsx?',
    '.*\\.d\\.ts',
  ],
});

module.exports = {
  // Workspace to test
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
    {
      ...shared('client'),
      testEnvironment: 'jsdom',
      setupFilesAfterEnv: ['<rootDir>/packages/client/tests/setup.ts'],
    },
    {
      ...shared('server'),
      testEnvironment: 'node',
    },
    {
      ...shared('cli'),
      testEnvironment: 'node',
    },
  ],

  // Coverage configurations
  collectCoverage: true,
  collectCoverageFrom: ['<rootDir>/**/*.{ts,tsx}'],
  coverageDirectory: '<rootDir>/coverage',
};
