module.exports = {
  testEnvironment: 'jsdom',
  transform: {
    '^.+\\.tsx?$': 'ts-jest',
  },
  setupFilesAfterEnv: ['<rootDir>/src/tests/setup.ts'],
  testMatch: ['<rootDir>/src/**/*.spec.{ts,tsx}'],
  collectCoverageFrom: ['<rootDir>/src/**/*.{ts,tsx}'],
};
