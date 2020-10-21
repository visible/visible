import '../styles/index.css';

import { DecoratorFn } from '@storybook/react';

export const withStyle: DecoratorFn = (storyFn) => {
  return storyFn();
};
