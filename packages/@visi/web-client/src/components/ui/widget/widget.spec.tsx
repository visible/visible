import { render } from '@testing-library/react';
import React from 'react';

import { Normal } from './widget.stories';

describe('Widget', () => {
  it('matches snapshot', () => {
    const { container } = render(<Normal />);
    expect(container.firstChild).toMatchSnapshot();
  });
});
