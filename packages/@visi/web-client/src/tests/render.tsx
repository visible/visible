import { MockedResponse } from '@apollo/react-testing';
import {
  render as defaultRender,
  RenderOptions as DefaultRenderOptions,
} from '@testing-library/react';
import React from 'react';

import { TestProvider } from './test-provider';

export interface RenderOptions extends Omit<DefaultRenderOptions, 'queries'> {
  // Mocked response for Apollo
  mocks?: MockedResponse[];
}

// See: https://testing-library.com/docs/react-testing-library/setup#custom-render
export const render = (ui: React.ReactElement, options: RenderOptions = {}) => {
  const { wrapper: Wrapper = React.Fragment, mocks = [], ...rest } = options;

  return defaultRender(ui, {
    wrapper: ({ children }) => (
      <TestProvider mocks={mocks}>
        <Wrapper>{children}</Wrapper>
      </TestProvider>
    ),
    ...rest,
  });
};
