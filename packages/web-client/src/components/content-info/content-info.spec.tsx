import { cleanup } from '@testing-library/react';
import React from 'react';

import { render } from '../../tests/render';
import { ContentInfo } from './content-info';

describe('ContentInfo', () => {
  afterEach(() => {
    cleanup();
  });

  it('matches to the snapshot', () => {
    const { container } = render(<ContentInfo />);
    expect(container).toMatchSnapshot();
  });
});
