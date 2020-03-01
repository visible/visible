import { number } from '@storybook/addon-knobs';
import React from 'react';

import { Progress } from '.';

export default {
  title: 'Progress',
  component: Progress,
};

export const normal = () => (
  <Progress
    progress={number('Progress', 50, { range: true, min: 0, max: 100 })}
  />
);