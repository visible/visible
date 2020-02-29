import { render } from '@testing-library/react';
import React from 'react';
import { ThemeProvider } from 'styled-components';

import { theme } from '../theme';
import { Nav, NavItem } from '.';

describe('Navigation', () => {
  it('matches snapshot', () => {
    const { container } = render(
      <ThemeProvider theme={theme}>
        <Nav>
          <NavItem>test</NavItem>
        </Nav>
      </ThemeProvider>,
    );
    expect(container.firstChild).toMatchSnapshot();
  });
});
