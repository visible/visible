module.exports = {
  projects: [
    {
      preset: 'jest-puppeteer',
      globals: {
        'ts-jest': {
          tsConfig: '<rootDir>/packages/core/tsconfig.json',
        },
      },
      transform: { '^.+\\.tsx?$': 'ts-jest' },
      testMatch: ['<rootDir>/packages/core/**/?(*.)+(spec|test).ts?(x)'],
      testPathIgnorePatterns: ['/node_modules/'],
      moduleFileExtensions: ['ts', 'tsx', 'js', 'jsx', 'json', 'node'],
      collectCoverageFrom: ['<rootDir>/core/**/*.{ts,tsx}'],
      coverageDirectory: '<rootDir>/coverage',
      coveragePathIgnorePatterns: ['.*\\.d\\.ts'],
    },
  ],
};
