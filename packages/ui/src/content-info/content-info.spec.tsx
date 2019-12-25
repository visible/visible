import React from 'react';
import { render } from '@testing-library/react';
import { ContentInfo } from '.';

describe('ContentInfo', () => {
  it('matches snapshot', () => {
    const { container } = render(<ContentInfo />);
    expect(container.firstChild).toMatchSnapshot();
  });
});
