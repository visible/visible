import { DecoratorFn } from '@storybook/react';
import React from 'react';

import { theme } from './__fixtures__/default-theme';
import { ConfigProvider } from './config';
import { GlobalStyle } from './global';

export const withTheme: DecoratorFn = (storyFn) => {
  return (
    <ConfigProvider theme={theme}>
      <GlobalStyle />
      {storyFn()}
    </ConfigProvider>
  );
};
