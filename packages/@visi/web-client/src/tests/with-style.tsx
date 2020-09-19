import '../style.css';

import { DecoratorFn } from '@storybook/react';

export const withStyle: DecoratorFn = (storyFn) => {
  return storyFn();
};
