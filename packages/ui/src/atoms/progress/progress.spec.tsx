import React from 'react';
import { render } from '@testing-library/react';
import { Progress } from '.';

describe('Progress', () => {
  it('matches snapshot', () => {
    const { container } = render(<Progress />);
    expect(container.firstChild).toMatchSnapshot();
  });
});
