import React from 'react';
import { ThemeProvider } from 'styled-components';

import { GlobalStyle } from './global';

export interface ConfigProviderProps {
  theme: unknown;
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
