import React from 'react';
import { storiesOf } from '@storybook/react';
import { text, boolean } from '@storybook/addon-knobs';
import { Input } from '.';

storiesOf('Atoms/Input', module).add('Normal', () => {
  const placeholder = text('Placeholder', 'Type your message');
  const disabled = boolean('Disabled', false);

  return <Input placeholder={placeholder} disabled={disabled} />;
});
