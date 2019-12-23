import React from 'react';
import { render } from '@testing-library/react';
import { List } from '.';

describe('List', () => {
  it('matches snapshot', () => {
    const { container } = render(<List />);
    expect(container.firstChild).toMatchSnapshot();
  });
});
