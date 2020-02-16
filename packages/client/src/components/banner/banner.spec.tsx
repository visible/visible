import React from 'react';
import { cleanup } from '@testing-library/react';
import { render } from '../../../tests/utils';
import { Banner } from './banner';

jest.mock('@visi/art/logo-white.png', () => ({
  __esModule: true,
  default: '',
}));

describe('Banner', () => {
  afterEach(() => {
    cleanup();
  });

  it('matches to the snapshot', () => {
    const { container } = render(<Banner />);
    expect(container).toMatchSnapshot();
  });
});
