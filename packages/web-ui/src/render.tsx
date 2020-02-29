import { render as defaultRender } from '@testing-library/react';
import { theme } from '@visi/resources';
import React from 'react';
import { ThemeProvider } from 'styled-components';

const TestProvider: React.FC = props => {
  const { children } = props;

  return <ThemeProvider theme={theme}>{children}</ThemeProvider>;
};

export const render = (ui: React.ReactElement) => {
  return defaultRender(ui, { wrapper: TestProvider });
};
