import { DecoratorFn } from '@storybook/react';
import { theme } from '@visi/resources';
import React from 'react';
import { ThemeProvider } from 'styled-components';

import { GlobalStyle } from './global';

export const withTheme: DecoratorFn = storyFn => {
  return (
    <ThemeProvider theme={theme}>
      {storyFn()}
      <GlobalStyle />
    </ThemeProvider>
  );
};
