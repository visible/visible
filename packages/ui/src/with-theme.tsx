import { DecoratorFn } from '@storybook/react';
import React from 'react';
import { ThemeProvider } from 'styled-components';

import { GlobalStyle } from './global';
import { theme } from './theme';

export const withTheme: DecoratorFn = storyFn => {
  return (
    <ThemeProvider theme={theme}>
      {storyFn()}
      <GlobalStyle />
    </ThemeProvider>
  );
};
