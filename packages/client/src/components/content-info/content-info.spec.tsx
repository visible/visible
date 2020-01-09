import React from 'react';
import { cleanup } from '@testing-library/react';
import { render } from '../../../tests/utils';
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
