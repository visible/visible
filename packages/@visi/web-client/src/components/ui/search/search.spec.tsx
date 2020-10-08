import { render } from '@testing-library/react';
import React from 'react';

import { Search } from '.';

describe('Search', () => {
  it('matches snapshot', () => {
    const { container } = render(<Search id="foo">Search</Search>);
    expect(container.firstChild).toMatchSnapshot();
  });
});
