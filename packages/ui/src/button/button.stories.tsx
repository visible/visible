import React from 'react';
import { text, boolean } from '@storybook/addon-knobs';
import { Button } from '.';

export default {
  title: 'Button',
  component: Button,
};

export const primary = () => (
  <Button appearance="primary" disabled={boolean('Disabled', false)}>
    {text('Content', 'Button')}
  </Button>
);

export const skeleton = () => (
  <Button appearance="skeleton" disabled={boolean('Disabled', false)}>
    {text('Content', 'Button')}
  </Button>
);
