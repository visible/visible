import resolve from '@rollup/plugin-node-resolve';
import commonjs from '@rollup/plugin-commonjs';
import json from '@rollup/plugin-json';
import builtins from 'rollup-plugin-node-builtins';
import typescript from 'rollup-plugin-typescript2';
import packageJSON from './package.json';

export default [
  {
    input: './src/main/index.ts',
    output: {
      format: 'cjs',
      file: packageJSON.main,
    },
    plugins: [
      commonjs(),
      builtins(),
      json(),
      typescript({
        useTsconfigDeclarationDir: true,
      }),
    ],
  },
  {
    input: './src/renderer/index.ts',
    output: {
      format: 'esm',
      file: packageJSON.browser,
    },
    plugins: [
      resolve(),
      builtins(),
      json(),
      commonjs(),
      typescript({
        useTsconfigDeclarationDir: true,
      }),
    ],
  },
];
