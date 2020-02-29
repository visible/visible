import React from 'react';

import { render } from '../render';
import { ContentInfo } from '.';

describe('ContentInfo', () => {
  it('matches snapshot', () => {
    const { container } = render(<ContentInfo />);
    expect(container.firstChild).toMatchSnapshot();
  });
});
