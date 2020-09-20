const { defaults } = require('jest-config');

module.exports = {
  globals: {
    'ts-jest': {
      tsConfig: 'tsconfig.jest.json',
    },
  },
  testEnvironment: 'jsdom',
  transform: {
    '^.+\\.tsx?$': 'ts-jest',
  },
  setupFilesAfterEnv: ['<rootDir>/src/tests/setup.tsx'],
  testMatch: ['<rootDir>/src/**/*.spec.{ts,tsx}'],
  collectCoverageFrom: ['<rootDir>/src/**/*.{ts,tsx}'],

  moduleNameMapper: {
    '\\.css$': '<rootDir>/src/tests/style-mock.ts',
  },

  coveragePathIgnorePatterns: [
    ...defaults.coveragePathIgnorePatterns,
    'generated',
  ],
};
