import React from 'react';

import { Code } from '.';

export default {
  title: 'Code',
  component: Code,
};

export const normal = () => (
  <Code language="javascript">{`
  function main(params = {}) {
    var json = JSON.stringify(params);
    console.log(json);
  }`}</Code>
);
