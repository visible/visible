import { render } from '@testing-library/react';
import React from 'react';
import { ThemeProvider } from 'styled-components';

import { theme } from '../theme';
import { Input } from '.';

describe('Input', () => {
  it('matches snapshot', () => {
    const { container } = render(
      <ThemeProvider theme={theme}>
        <Input />
      </ThemeProvider>,
    );
    expect(container.firstChild).toMatchSnapshot();
  });
});
