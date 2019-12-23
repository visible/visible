import React from 'react';
import { storiesOf } from '@storybook/react';
import { number } from '@storybook/addon-knobs';
import { Progress } from '.';

storiesOf('Atoms/Progress', module).add('Normal', () => {
  const progress = number('Progress', 50, { range: true, min: 0, max: 100 });
  return <Progress progress={progress} />;
});
