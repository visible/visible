import { render } from '@testing-library/react';
import React from 'react';

import { Normal } from './select.stories';

describe('Select', () => {
  it('matches snapshot', () => {
    const { container } = render(<Normal />);
    expect(container.firstChild).toMatchSnapshot();
  });
});
