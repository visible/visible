import { cleanup } from '@testing-library/react';
import React from 'react';

import { render } from '../../tests/render';
import { Banner } from './banner';

describe('Banner', () => {
  afterEach(() => {
    cleanup();
  });

  it('matches to the snapshot', () => {
    const { container } = render(<Banner />);
    expect(container).toMatchSnapshot();
  });
});
