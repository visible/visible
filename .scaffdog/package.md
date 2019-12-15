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
  "name": "@visi/{{ input | kebab }",
  "version": "1.0.0",
  "license": "AGPL-3.0",
  "main": "./dist/index.js",
  "files": [
    "./dist"
  ]
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
