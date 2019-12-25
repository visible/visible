import React from 'react';
import { render } from '@testing-library/react';
import { Banner } from '.';

describe('Banner', () => {
  it('matches snapshot', () => {
    const { container } = render(<Banner />);
    expect(container.firstChild).toMatchSnapshot();
  });
});
