import path from 'path';
import express from 'express';

export interface ModuleResolver {
  start(): Promise<void>;
}

export class ModuleResolverImpl implements ModuleResolver {
  constructor(private readonly port: number, private readonly field = 'main') {}

  start() {
    return new Promise<void>(resolve =>
      express()
        .use((req, res) => {
          // e.g. `@visi/plugin-standard`
          const pathname = req.path.replace(/^\//, '');
          // `@visi/plugin-standard/package.json`
          const packageJsonPath = require.resolve(pathname + '/package.json');
          const packageJson = require(packageJsonPath);

          // @visi/plugin-standard/dist/renderer.js
          const filePath = require.resolve(
            path.join(pathname, packageJson[this.field]),
          );

          return res.contentType('text/javascript').sendFile(filePath);
        })
        .listen(this.port, () => resolve()),
    );
  }
}
