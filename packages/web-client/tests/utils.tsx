import { MockedProvider, MockedResponse } from '@apollo/react-testing';
import { render as defaultRender, RenderOptions } from '@testing-library/react';
import { theme as defaultTheme } from '@visi/resources';
import { ConfigProvider, Theme } from '@visi/web-ui';
import React from 'react';
import { MemoryRouter } from 'react-router';

export interface TestProvidersProps {
  children?: React.ReactNode;
  paths: string[];
  theme: Theme;
  mocks: MockedResponse[];
}

export const TestProviders = (props: TestProvidersProps) => {
  const { children, paths, theme, mocks } = props;

  return (
    <MockedProvider mocks={mocks}>
      <ConfigProvider theme={theme}>
        <MemoryRouter initialEntries={paths}>{children}</MemoryRouter>
      </ConfigProvider>
    </MockedProvider>
  );
};

export interface RenderProps extends Omit<RenderOptions, 'queries'> {
  paths?: string[];
  theme?: Theme;
  mocks?: MockedResponse[];
}

// See: https://testing-library.com/docs/react-testing-library/setup#custom-render
export const render = (ui: React.ReactElement, options: RenderProps = {}) => {
  const {
    wrapper: Wrapper = React.Fragment,
    paths = ['/'],
    mocks = [],
    theme = defaultTheme,
    ...rest
  } = options;

  return defaultRender(ui, {
    wrapper: ({ children }) => (
      <TestProviders paths={paths} theme={theme} mocks={mocks}>
        <Wrapper>{children}</Wrapper>
      </TestProviders>
    ),
    ...rest,
  });
};
