import React from 'react';
import { DecoratorFn } from '@storybook/react';
import { ThemeProvider } from 'styled-components';
import { theme, GlobalStyle } from '../packages/ui/src';

export const withTheme: DecoratorFn = storyFn => {
  return (
    <ThemeProvider theme={theme}>
      {storyFn()}
      <GlobalStyle />
    </ThemeProvider>
  );
};
