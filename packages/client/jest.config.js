const { defaults } = require('jest-config');

module.exports = {
  testEnvironment: 'jsdom',
  transform: {
    '^.+\\.tsx?$': 'ts-jest',
  },
  setupFilesAfterEnv: ['<rootDir>/tests/setup.tsx'],
  testMatch: ['<rootDir>/src/**/*.spec.{ts,tsx}'],
  collectCoverageFrom: ['<rootDir>/src/**/*.{ts,tsx}'],

  coveragePathIgnorePatterns: [
    ...defaults.coveragePathIgnorePatterns,
    'generated',
  ],
};
