import resolve from 'rollup-plugin-node-resolve';
import typescript from 'rollup-plugin-typescript2';
import packageJSON from './package.json';

export default {
  input: './src/index.ts',
  output: {
    format: 'iife',
    extend: true,
    file: packageJSON.main,
    name: packageJSON.name,
  },
  plugins: [resolve(), typescript()],
};
