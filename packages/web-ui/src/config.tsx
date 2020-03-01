import React from 'react';
import { ThemeProvider } from 'styled-components';

import { GlobalStyle } from './global';
import { Theme } from './theme';

export interface ConfigProviderProps {
  theme: Theme;
  children: React.ReactNode;
}

export const ConfigProvider = (props: ConfigProviderProps) => {
  const { theme, children } = props;

  return (
    <ThemeProvider theme={theme}>
      <GlobalStyle />
      {children}
    </ThemeProvider>
  );
};
