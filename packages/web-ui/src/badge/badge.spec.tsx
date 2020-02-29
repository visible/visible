import { render } from '@testing-library/react';
import React from 'react';
import { ThemeProvider } from 'styled-components';

import { theme } from '../theme';
import { Badge } from '.';

describe('Badge', () => {
  it('matches snapshot', () => {
    const { container } = render(
      <ThemeProvider theme={theme}>
        <Badge />
      </ThemeProvider>,
    );
    expect(container.firstChild).toMatchSnapshot();
  });
});
