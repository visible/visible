import { render } from '@testing-library/react';
import React from 'react';

import {
  Primary,
  PrimaryDisabled,
  PrimaryLarge,
  Secondary,
  SecondaryDisabled,
} from './button.stories';

describe('Input', () => {
  test('primary', () => {
    const { container } = render(<Primary />);
    expect(container.firstChild).toMatchSnapshot();
  });

  test('primary disabled', () => {
    const { container } = render(<PrimaryDisabled />);
    expect(container.firstChild).toMatchSnapshot();
  });

  test('primary large', () => {
    const { container } = render(<PrimaryLarge />);
    expect(container.firstChild).toMatchSnapshot();
  });

  test('primary large', () => {
    const { container } = render(<PrimaryLarge />);
    expect(container.firstChild).toMatchSnapshot();
  });

  test('secondary', () => {
    const { container } = render(<Secondary />);
    expect(container.firstChild).toMatchSnapshot();
  });

  test('secondary disabled', () => {
    const { container } = render(<SecondaryDisabled />);
    expect(container.firstChild).toMatchSnapshot();
  });
});
