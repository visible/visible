module.exports = {
  testEnvironment: 'jsdom',
  transform: {
    '^.+\\.tsx?$': 'ts-jest',
  },
  setupFiles: ['core-js'],
  testMatch: ['<rootDir>/src/**/*.spec.{ts,tsx}'],
  collectCoverageFrom: ['<rootDir>/src/**/*.{ts,tsx}'],
};
