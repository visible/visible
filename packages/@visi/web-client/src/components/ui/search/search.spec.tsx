import { render } from '@testing-library/react';
import React from 'react';

import { Disabled, Large, Normal } from './search.stories';

describe('Search', () => {
  it('normal', () => {
    const { container } = render(<Normal />);
    expect(container.firstChild).toMatchSnapshot();
  });

  it('large', () => {
    const { container } = render(<Large />);
    expect(container.firstChild).toMatchSnapshot();
  });

  it('disabled', () => {
    const { container } = render(<Disabled />);
    expect(container.firstChild).toMatchSnapshot();
  });
});
