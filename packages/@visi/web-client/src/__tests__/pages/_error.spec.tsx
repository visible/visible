import { cleanup } from '@testing-library/react';
import React from 'react';

import Error from '../../pages/_error';
import { render } from '../../tests/render';

describe('NotFound', () => {
  afterEach(() => {
    cleanup();
  });

  it('matches to the snapshot', () => {
    const { container } = render(
      <Error name="name" message="message" statusCode={503} stack="foo" />,
    );
    expect(container).toMatchSnapshot();
  });
});
