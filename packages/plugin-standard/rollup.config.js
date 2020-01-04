import resolve from 'rollup-plugin-node-resolve';
import commonjs from 'rollup-plugin-commonjs';
import typescript from 'rollup-plugin-typescript2';
import json from 'rollup-plugin-json';
import builtins from 'rollup-plugin-node-builtins';
import packageJSON from './package.json';

export default [
  {
    input: './src/main/index.ts',
    output: {
      format: 'cjs',
      file: packageJSON.main,
    },
    plugins: [typescript()],
  },
  {
    input: './src/renderer/index.ts',
    output: {
      format: 'esm',
      name: packageJSON.name,
      file: packageJSON.browser,
    },
    plugins: [
      resolve({
        preferBuiltins: true,
      }),
      builtins(),
      json(),
      commonjs(),
      typescript(),
    ],
  },
];
