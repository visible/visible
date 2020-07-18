import React from 'react';

import { render } from '../render';
import { Input } from '.';

describe('Input', () => {
  it('matches snapshot', () => {
    const { container } = render(<Input />);
    expect(container.firstChild).toMatchSnapshot();
  });
});
