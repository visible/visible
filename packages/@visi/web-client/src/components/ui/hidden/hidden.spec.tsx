import { render } from '@testing-library/react';
import React from 'react';

import { Normal } from './hidden.stories';

describe('Hidden', () => {
  it('matches snapshot', () => {
    const { container } = render(<Normal />);
    expect(container.firstChild).toMatchSnapshot();
  });
});
