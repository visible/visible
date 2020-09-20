import { render } from '@testing-library/react';
import React from 'react';

import { Badge } from '.';

describe('Badge', () => {
  it('matches snapshot', () => {
    const { container } = render(<Badge variant="red">test</Badge>);
    expect(container.firstChild).toMatchSnapshot();
  });
});
