import { MockedProvider, MockedResponse } from '@apollo/react-testing';
import { ConfigProvider, Theme } from '@visi/web-ui';
import React from 'react';

export interface TestProviderProps {
  children?: React.ReactNode;
  theme: Theme;
  mocks: MockedResponse[];
}

export const TestProvider = (props: TestProviderProps) => {
  const { children, theme, mocks } = props;

  return (
    <MockedProvider mocks={mocks}>
      <ConfigProvider theme={theme}>{children}</ConfigProvider>
    </MockedProvider>
  );
};
