import React from 'react';

import { render } from '../render';
import { Banner } from '.';

describe('Banner', () => {
  it('matches snapshot', () => {
    const { container } = render(<Banner>Visible</Banner>);
    expect(container.firstChild).toMatchSnapshot();
  });
});
