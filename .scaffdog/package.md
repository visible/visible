---
name: 'package'
description: 'Generates @visi package'
message: 'Type the name for your package e.g. `core`'
root: './packages/'
ignore: []
---

# {{ input | kebab }}/package.json
```json
{
  "name": "@visi/{{ input | kebab }}",
  "version": "1.0.0",
  "repository": "https://github.com/neet/visible.git",
  "author": "Ryo Igarashi <n33t5hin@gmail.com>",
  "license": "AGPL-3.0",
  "main": "./dist/index.js",
  "files": [
    "./dist"
  ],
  "publishConfig": {
    "access": "public"
  }
}
```

# {{ input | kebab }}/tsconfig.json
```json
{
  "extends": "../../tsconfig.json",
  "compilerOptions": {
    "outDir": "./dist",
  },
  "include": ["./src/**/*"]
}
```

# {{ input | kebab }}/src/index.ts
```ts

```
