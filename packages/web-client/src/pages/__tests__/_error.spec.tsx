import React from 'react';

import { Void } from '../_error';
import { render } from '../../tests/utils';

describe('Void', () => {
  it('matches to the snapshot', () => {
    const { container } = render(<Void />);
    expect(container).toMatchSnapshot();
  });
});
