import React from 'react';
import { storiesOf } from '@storybook/react';
import { text, boolean } from '@storybook/addon-knobs';
import { Button } from '.';

storiesOf('Atoms/Button', module)
  .add('Primary', () => {
    const content = text('Content', 'Button');
    const disabled = boolean('Disabled', false);

    return (
      <Button appearance="primary" disabled={disabled}>
        {content}
      </Button>
    );
  })
  .add('Skeleton', () => {
    const content = text('Content', 'Button');
    const disabled = boolean('Disabled', false);

    return (
      <Button appearance="skeleton" disabled={disabled}>
        {content}
      </Button>
    );
  });
