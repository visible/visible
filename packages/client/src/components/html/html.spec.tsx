import React from 'react';
import { render } from '@testing-library/react';
import { Html } from '.';

describe('Html', () => {
  it('matches snapshot', () => {
    const { container } = render(
      <Html
        state={{ foo: 'bar' }}
        content="hello"
        manifest={{ 'main.js': '/dist/foobar.js' }}
        elements={[<meta key="my meta" content="test"></meta>]}
      />,
    );
    expect(container.firstChild).toMatchSnapshot();
  });
});
