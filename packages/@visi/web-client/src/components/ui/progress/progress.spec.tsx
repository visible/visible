import { render } from '@testing-library/react';
import React from 'react';

import { Progress } from '.';

describe('Progress', () => {
  it('matches snapshot', () => {
    const { container } = render(<Progress max={10} value={5} label="foo" />);
    expect(container.firstChild).toMatchSnapshot();
  });
});
