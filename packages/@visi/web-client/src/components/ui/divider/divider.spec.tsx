import { render } from '@testing-library/react';
import React from 'react';

import { Divider } from '.';

describe('Divider', () => {
  it('matches snapshot', () => {
    const { container } = render(<Divider />);
    expect(container.firstChild).toMatchSnapshot();
  });
});
