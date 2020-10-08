import { render } from '@testing-library/react';
import React from 'react';

import { Diff, Normal } from './code-frame.stories';

describe('CodeFrame', () => {
  it('matches snapshot', () => {
    const { container } = render(<Normal />);
    expect(container.firstChild).toMatchSnapshot();
  });
});

describe('DiffCodeFrame', () => {
  it('matches snapshot', () => {
    const { container } = render(<Diff />);
    expect(container.firstChild).toMatchSnapshot();
  });
});
