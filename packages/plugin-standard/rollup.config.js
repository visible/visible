import commonjs from '@rollup/plugin-commonjs';
import json from '@rollup/plugin-json';
import builtins from 'rollup-plugin-node-builtins';
import typescript from 'rollup-plugin-typescript2';
import packageJSON from './package.json';

export default [
  {
    input: './src/index.ts',
    output: {
      format: 'cjs',
      file: packageJSON.main,
    },
    plugins: [
      commonjs(),
      builtins(),
      json(),
      typescript(),
    ],
  },
];
