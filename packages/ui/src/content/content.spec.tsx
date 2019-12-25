import React from 'react';
import { render } from '@testing-library/react';
import { Content } from '.';

describe('Content', () => {
  it('matches snapshot', () => {
    const { container } = render(<Content />);
    expect(container.firstChild).toMatchSnapshot();
  });
});
