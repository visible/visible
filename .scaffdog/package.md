---
name: 'package'
description: 'Generates @visi package'
message: 'Type the name for your package e.g. `core`'
root: packages/@visi
output: '**/*'
ignore: []
---

# `{{ input | kebab }}/package.json`
```json
{
  "name": "@visi/{{ input | kebab }}",
  "version": "0.0.0",
  "repository": "https://github.com/visible/visible.git",
  "author": "Ryo Igarashi <n33t5hin@gmail.com>",
  "license": "AGPL-3.0",
  "main": "./dist/index.js",
  "scripts": {
    "build": "tsc",
    "test": "jest"
  },
  "files": [
    "./dist"
  ],
  "publishConfig": {
    "access": "public"
  }
}
```

# `{{ input | kebab }}/tsconfig.json`
```json
{
  "extends": "../../tsconfig.json",
  "compilerOptions": {
    "outDir": "./dist",
  },
  "include": ["./src/**/*"]
}
```

# `{{ input | kebab }}/jest.config.js`
```js
module.exports = {
  testEnvironment: 'node',
  transform: {
    '^.+\\.tsx?$': 'ts-jest',
  },
  testMatch: ['<rootDir>/src/**/*.spec.{ts,tsx}'],
  collectCoverageFrom: ['<rootDir>/src/**/*.{ts,tsx}'],
  // setupFilesAfterEnv: ['<rootDir>/tests/setup.ts'],
};
```

# `{{ input | kebab }}/src/index.ts`
```ts

```
