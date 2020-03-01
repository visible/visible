import React from 'react';

import { render } from '../render';
import { List } from '.';

describe('List', () => {
  it('matches snapshot', () => {
    const { container } = render(<List />);
    expect(container.firstChild).toMatchSnapshot();
  });
});
