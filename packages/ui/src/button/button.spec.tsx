import '@testing-library/jest-dom/extend-expect';
import React from 'react';
import { render } from '@testing-library/react';
import { ThemeProvider } from 'styled-components';
import { theme } from '../theme';
import { Button } from '.';

describe('Button', () => {
  it('renders primary button', () => {
    const { container } = render(
      <ThemeProvider theme={theme}>
        <Button appearance="primary" />
      </ThemeProvider>,
    );
    expect(container.firstChild).toMatchSnapshot();
  });

  it('renders skeleton button', () => {
    const { container } = render(
      <ThemeProvider theme={theme}>
        <Button appearance="skeleton" />
      </ThemeProvider>,
    );
    expect(container.firstChild).toMatchSnapshot();
  });
});
