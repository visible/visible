import { render } from '@testing-library/react';
import React from 'react';

import { Normal } from './nav.stories';

describe('Nav', () => {
  it('matches snapshot', () => {
    const { container } = render(<Normal />);
    expect(container.firstChild).toMatchSnapshot();
  });
});
