import { render } from '@testing-library/react';
import React from 'react';

import { Image } from '.';

describe('Image', () => {
  it('matches snapshot', () => {
    const { container } = render(<Image src="/image.png" alt="image" />);
    expect(container.firstChild).toMatchSnapshot();
  });
});
