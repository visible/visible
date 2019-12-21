import React from 'react';
import { render, cleanup } from '@testing-library/react';
import { Button } from '.';

describe('Button', () => {
  it('matches snapshot', () => {
    const { container } = render(<Button />);
    expect(container.firstChild).toMatchSnapshot();
  });
});
