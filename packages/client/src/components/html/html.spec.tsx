import React from 'react';
import { render } from '@testing-library/react';
import { Html } from '.';

describe('Html', () => {
  it('matches snapshot', () => {
    const { container } = render(
      <Html state={{}} content="hello" manifest={{}} />,
    );
    expect(container.firstChild).toMatchSnapshot();
  });
});
