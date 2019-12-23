import React from 'react';
import { storiesOf } from '@storybook/react';
import { Code } from '.';

storiesOf('Code', module).add('Normal', () => {
  const code = `function main(params = {}) {
  var json = JSON.stringify(params);
  console.log(json);
}`;

  return <Code language="javascript">{code}</Code>;
});
