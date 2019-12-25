const { defaults } = require('jest-config');

const shared = package => ({
  displayName: package,
  globals: {
    'ts-jest': {
      tsConfig: `<rootDir>/packages/${package}/tsconfig.json`,
    },
  },
  testMatch: [`<rootDir>/packages/${package}/src/**/*.spec.{ts,tsx}`],
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

  // Transform TypeScript
  transform: {
    ...defaults.transform,
    '^.+\\.tsx?$': 'ts-jest',
  },

  // Ignore /node_modules/ and /dist/
  testPathIgnorePatterns: [...defaults.testPathIgnorePatterns, '/dist/'],

  // Coverage configurations
  collectCoverage: true,
  collectCoverageFrom: ['<rootDir>/**/*.{ts,tsx}'],
  coverageDirectory: '<rootDir>/coverage',
  coveragePathIgnorePatterns: [
    ...defaults.coveragePathIgnorePatterns,
    '/dist/',
    '.*\\.spec\\.tsx?',
    '.*\\.stories\\.tsx?',
    '.*\\.d\\.ts',
  ],
};
