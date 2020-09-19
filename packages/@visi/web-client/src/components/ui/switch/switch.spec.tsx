import { render } from '@testing-library/react';
import React from 'react';

import { Switch } from '.';

describe('Switch', () => {
  it('matches snapshot', () => {
    const { container } = render(<Switch>test</Switch>);
    expect(container.firstChild).toMatchSnapshot();
  });
});
