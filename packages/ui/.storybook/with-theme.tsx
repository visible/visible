import React from 'react';
import { addDecorator } from '@storybook/react';
import { ThemeProvider } from 'styled-components';
import { theme } from '../src/theme';

export const withTheme: Parameters<typeof addDecorator>[0] = storyFn => {
  return (
    <ThemeProvider theme={theme}>
      {storyFn()}
    </ThemeProvider>
  );
};
