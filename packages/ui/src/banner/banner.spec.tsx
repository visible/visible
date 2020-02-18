import { render } from '@testing-library/react';
import React from 'react';
import { ThemeProvider } from 'styled-components';

import { theme } from '../theme';
import { Banner } from '.';

describe('Banner', () => {
  it('matches snapshot', () => {
    const { container } = render(
      <ThemeProvider theme={theme}>
        <Banner>Visible</Banner>
      </ThemeProvider>,
    );
    expect(container.firstChild).toMatchSnapshot();
  });
});
