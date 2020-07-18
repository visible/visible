import { boolean, text } from '@storybook/addon-knobs';
import React from 'react';

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

export const loading = () => (
  <Button appearance="primary" loading={true}>
    {text('Content', 'Button')}
  </Button>
);
