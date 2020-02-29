import React from 'react';

import { render } from '../render';
import { Progress } from '.';

describe('Progress', () => {
  it('matches snapshot', () => {
    const { container } = render(<Progress progress={50} />);
    expect(container.firstChild).toMatchSnapshot();
  });
});
