const { defaults } = require('jest-config');

module.exports = {
  testEnvironment: 'jsdom',
  transform: {
    '^.+\\.tsx?$': 'ts-jest',
  },
  setupFilesAfterEnv: ['<rootDir>/tests/setup.ts'],
  testMatch: ['<rootDir>/src/**/*.spec.{ts,tsx}'],
  collectCoverageFrom: ['<rootDir>/src/**/*.{ts,tsx}'],

  coveragePathIgnorePatterns: [
    ...defaults.coveragePathIgnorePatterns,
    '.*\\.stories\\.tsx?',
  ],
};
