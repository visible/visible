import React from 'react';
import { text, boolean } from '@storybook/addon-knobs';
import { Button } from '.';

export default {
  title: 'Button',
  component: Button,
};

export const primary = () => {
  const content = text('Content', 'Button');
  const disabled = boolean('Disabled', false);

  return (
    <Button appearance="primary" disabled={disabled}>
      {content}
    </Button>
  );
};

export const skeleton = () => {
  const content = text('Content', 'Button');
  const disabled = boolean('Disabled', false);

  return (
    <Button appearance="skeleton" disabled={disabled}>
      {content}
    </Button>
  );
};
