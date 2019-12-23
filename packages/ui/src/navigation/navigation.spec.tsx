import React from 'react';
import { render } from '@testing-library/react';
import { Nav, NavItem } from '.';

describe('Navigation', () => {
  it('matches snapshot', () => {
    const { container } = render(
      <Nav>
        <NavItem>test</NavItem>
      </Nav>,
    );
    expect(container.firstChild).toMatchSnapshot();
  });
});
