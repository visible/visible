import React from 'react';
import { render } from '@testing-library/react';
import { Badge } from '.';

describe('Badge', () => {
  it('matches snapshot', () => {
    const { container } = render(<Badge />);
    expect(container.firstChild).toMatchSnapshot();
  });
});
