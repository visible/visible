import { render } from '@testing-library/react';
import React from 'react';

import { Large, Password, Small, Text } from './input.stories';

describe('Input', () => {
  test('large', () => {
    const { container } = render(<Large />);
    expect(container.firstChild).toMatchSnapshot();
  });

  test('password', () => {
    const { container } = render(<Password />);
    expect(container.firstChild).toMatchSnapshot();
  });

  test('small', () => {
    const { container } = render(<Small />);
    expect(container.firstChild).toMatchSnapshot();
  });

  test('text', () => {
    const { container } = render(<Text />);
    expect(container.firstChild).toMatchSnapshot();
  });
});
