import { number } from '@storybook/addon-knobs';
import React from 'react';

import { Progress } from '.';

export default {
  title: 'Progress',
  component: Progress,
};

export const normal = () => (
  <Progress max={100} value={number('Progress', 50)} />
);
