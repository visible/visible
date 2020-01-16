import React from 'react';
import { number } from '@storybook/addon-knobs';
import { Progress } from '.';

export default {
  title: 'Progress',
  component: Progress,
};

export const normal = () => {
  const progress = number('Progress', 50, { range: true, min: 0, max: 100 });
  return <Progress progress={progress} />;
};
