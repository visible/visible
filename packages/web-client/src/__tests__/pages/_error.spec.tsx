import { cleanup } from '@testing-library/react';
import React from 'react';

import Error from '../../pages/_error';
import { render } from '../../tests/render';

describe('Error', () => {
  afterEach(() => {
    cleanup();
  });

  it('matches to the snapshot', () => {
    const { container } = render(<Error />);
    expect(container).toMatchSnapshot();
  });
});
