import React from 'react';

import { render } from '../render';
import { Typography } from '.';

describe('Typography', () => {
  it('matches snapshot', () => {
    const { container } = render(<Typography variant="body">foo</Typography>);
    expect(container.firstChild).toMatchSnapshot();
  });
});
