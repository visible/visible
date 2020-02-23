import { boolean, text } from '@storybook/addon-knobs';
import React from 'react';

import { Input } from '.';

export default {
  title: 'Input',
  component: Input,
};

export const normal = () => {
  return (
    <Input
      placeholder={text('Placeholder', 'Type your message')}
      disabled={boolean('Disabled', false)}
    />
  );
};
