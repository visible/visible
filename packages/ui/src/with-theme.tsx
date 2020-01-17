import { DecoratorFn } from '@storybook/react';
import React from 'react';
import { ThemeProvider } from 'styled-components';
import { theme } from './theme';
import { GlobalStyle } from './global';

export const withTheme: DecoratorFn = storyFn => {
  return (
    <ThemeProvider theme={theme}>
      {storyFn()}
      <GlobalStyle />
    </ThemeProvider>
  );
};
