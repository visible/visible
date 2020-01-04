import resolve from 'rollup-plugin-node-resolve';
import typescript from 'rollup-plugin-typescript2';
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
    plugins: [resolve(), typescript()],
  },
];
