import commonjs from '@rollup/plugin-commonjs';
import json from '@rollup/plugin-json';
import resolve from '@rollup/plugin-node-resolve';
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
    input: ['./src/renderer/gateway/index.ts'],
    output: {
      file: './dist/gateway/index.js',
      name: '__VISIBLE_GATEWAY__',
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
