import React from 'react';

import Error from '../_error';
import { render } from '../../tests/utils';

describe('Void', () => {
  it('matches to the snapshot', () => {
    const { container } = render(<Error />);
    expect(container).toMatchSnapshot();
  });
});
