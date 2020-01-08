import resolve from '@rollup/plugin-node-resolve';
import commonjs from '@rollup/plugin-commonjs';
import json from '@rollup/plugin-json';
import typescript from 'rollup-plugin-typescript2';

export default [
  {
    input: './src/main/index.ts',
    output: {
      file: './dist/main/index.js',
      format: 'cjs',
    },
    plugins: [
      commonjs(),
      json(),
      typescript({
        useTsconfigDeclarationDir: true,
      }),
    ],
  },
  {
    input: './src/renderer/index.ts',
    output: {
      file: './dist/renderer/index.js',
      format: 'cjs',
    },
    plugins: [
      commonjs(),
      json(),
      typescript({
        useTsconfigDeclarationDir: true,
      }),
    ],
  },
  {
    input: ['./src/embed/index.ts'],
    output: {
      file: './dist/embed/index.js',
      name: '__VISIBLE_EMBED__',
      format: 'iife',
    },
    plugins: [
      resolve(),
      commonjs(),
      json(),
      typescript({
        useTsconfigDeclarationDir: true,
      }),
    ],
  },
];
