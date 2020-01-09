import React from 'react';
import { render } from '../../../tests/utils';
import { Void } from './void';

describe('Void', () => {
  it('matches to the snapshot', () => {
    const { container } = render(<Void />);
    expect(container).toMatchSnapshot();
  });
});
