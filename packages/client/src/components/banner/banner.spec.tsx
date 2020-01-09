import React from 'react';
import { cleanup } from '@testing-library/react';
import { render } from '../../../tests/utils';
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
