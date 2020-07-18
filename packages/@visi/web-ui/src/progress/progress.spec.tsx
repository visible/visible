import React from 'react';

import { render } from '../render';
import { Progress } from '.';

describe('Progress', () => {
  it('matches snapshot', () => {
    const { container } = render(<Progress value={50} max={100} />);
    expect(container.firstChild).toMatchSnapshot();
  });
});
