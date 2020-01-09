import React from 'react';
import { theme } from '@visi/ui';
import { render, RenderOptions } from '@testing-library/react';
import { ThemeProvider } from 'styled-components';
// import { I18nextProvider } from 'react-i18next';

const AllTheProviders: React.FC = ({ children }) => {
  return <ThemeProvider theme={theme}>{children}</ThemeProvider>;
};

// See: https://testing-library.com/docs/react-testing-library/setup#custom-render
const customRender = (
  ui: React.ReactElement,
  {
    wrapper: AdditionalWrapper = React.Fragment,
    ...options
  }: Omit<RenderOptions, 'queries'>,
) => {
  return render(ui, {
    wrapper: ({ children }) => (
      <AllTheProviders>
        <AdditionalWrapper>{children}</AdditionalWrapper>
      </AllTheProviders>
    ),
    ...options,
  });
};

export * from '@testing-library/react';
export { customRender as render };
