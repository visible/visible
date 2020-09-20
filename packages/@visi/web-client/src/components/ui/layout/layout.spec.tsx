import { render } from '@testing-library/react';
import React from 'react';

import { Normal } from './layout.stories';

describe('Layout', () => {
  it('matches snapshot', () => {
    const { container } = render(<Normal />);
    expect(container.firstChild).toMatchSnapshot();
  });
});
