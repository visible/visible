import { MockedResponse } from '@apollo/react-testing';
import {
  render as defaultRender,
  RenderOptions as DefaultRenderOptions,
} from '@testing-library/react';
import { Theme } from '@visi/web-ui';
import React from 'react';

import { theme as defaultTheme } from '../theme';
import { TestProvider } from './test-provider';

export interface RenderOptions extends Omit<DefaultRenderOptions, 'queries'> {
  // Mocked theme
  theme?: Theme;
  // Mocked response for Apollo
  mocks?: MockedResponse[];
}

// See: https://testing-library.com/docs/react-testing-library/setup#custom-render
export const render = (ui: React.ReactElement, options: RenderOptions = {}) => {
  const {
    wrapper: Wrapper = React.Fragment,
    mocks = [],
    theme = defaultTheme,
    ...rest
  } = options;

  return defaultRender(ui, {
    wrapper: ({ children }) => (
      <TestProvider theme={theme} mocks={mocks}>
        <Wrapper>{children}</Wrapper>
      </TestProvider>
    ),
    ...rest,
  });
};
