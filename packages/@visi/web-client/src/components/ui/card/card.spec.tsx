import { render } from '@testing-library/react';
import React from 'react';

import { Solid } from './card.stories';

describe('Card', () => {
  it('matches snapshot', () => {
    const { container } = render(<Solid />);
    expect(container.firstChild).toMatchSnapshot();
  });
});
