import React from 'react';

import { render } from '../render';
import { Badge } from '.';

describe('Badge', () => {
  it('matches snapshot', () => {
    const { container } = render(<Badge />);
    expect(container.firstChild).toMatchSnapshot();
  });
});
