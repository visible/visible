import { DecoratorFn } from '@storybook/react';
import React from 'react';

import { ConfigProvider } from './config';
import { GlobalStyle } from './global';

const theme = {
  foreground: {
    normal: '#333333',
    wash: '#666666',
  },
  background: {
    normal: '#ffffff',
    wash: '#f1f1f1',
  },
  highlight: {
    normal: '#ffaa01',
  },
  border: {
    normal: '#e6e6e6',
  },
};

export const withTheme: DecoratorFn = storyFn => {
  return (
    <ConfigProvider theme={theme}>
      {storyFn()}
      <GlobalStyle />
    </ConfigProvider>
  );
};
