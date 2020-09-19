import { MockedProvider, MockedResponse } from '@apollo/react-testing';
import React from 'react';

export interface TestProviderProps {
  children?: React.ReactNode;
  mocks: MockedResponse[];
}

export const TestProvider = (props: TestProviderProps) => {
  const { children, mocks } = props;

  return (
    <MockedProvider mocks={mocks}>
      <>{children}</>
    </MockedProvider>
  );
};
