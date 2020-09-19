import { render } from '@testing-library/react';
import React from 'react';

import { Input } from '.';

describe('Input', () => {
  it('matches snapshot', () => {
    const { container } = render(<Input />);
    expect(container.firstChild).toMatchSnapshot();
  });
});
