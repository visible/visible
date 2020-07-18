import React from 'react';

import { render } from '../render';
import { Button } from '.';

describe('Button', () => {
  it('renders primary button', () => {
    const { container } = render(<Button appearance="primary" />);
    expect(container.firstChild).toMatchSnapshot();
  });

  it('renders skeleton button', () => {
    const { container } = render(<Button appearance="skeleton" />);
    expect(container.firstChild).toMatchSnapshot();
  });
});
