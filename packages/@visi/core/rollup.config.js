import commonjs from '@rollup/plugin-commonjs';
import json from '@rollup/plugin-json';
import resolve from '@rollup/plugin-node-resolve';
import path from 'path';
import typescript from 'rollup-plugin-typescript2';

export default [
  {
    input: './src/index.ts',
    output: {
      file: './dist/main/index.js',
      format: 'cjs',
    },
    plugins: [
      commonjs(),
      json(),
      typescript({
        tsconfig: path.resolve('./tsconfig.main.json'),
      }),
    ],
  },
  {
    input: ['./src/gateway/index.ts'],
    output: {
      file: './dist/gateway/index.js',
      name: 'visible',
      format: 'umd',
    },
    plugins: [
      resolve(),
      commonjs(),
      json(),
      typescript({
        tsconfig: path.resolve('./tsconfig.gateway.json'),
      }),
    ],
  },
];
