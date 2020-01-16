import React from 'react';
import { Code } from '.';

export default {
  title: 'Code',
  component: Code,
};

export const normal = () => {
  const code = `function main(params = {}) {
  var json = JSON.stringify(params);
  console.log(json);
}`;

  return <Code language="javascript">{code}</Code>;
};
