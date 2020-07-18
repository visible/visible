import { cleanup } from '@testing-library/react';
import React from 'react';

import NotFound from '../../pages/404';
import { render } from '../../tests/render';

describe('NotFound', () => {
  afterEach(() => {
    cleanup();
  });

  it('matches to the snapshot', () => {
    const { container } = render(<NotFound />);
    expect(container).toMatchSnapshot();
  });
});
