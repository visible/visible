import { render } from '@testing-library/react';
import React from 'react';

import { Mixed } from './typography.stories';

describe('Typography', () => {
  it('matches snapshot', () => {
    const { container } = render(<Mixed />);
    expect(container.firstChild).toMatchSnapshot();
  });
});
