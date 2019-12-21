import React from 'react';
import { render, fireEvent } from '@testing-library/react';
import { ThemeProvider } from 'styled-components';
import { theme } from '../../theme';
import { Search } from '.';

describe('Search', () => {
  it('matches snapshot', () => {
    const { container } = render(
      <ThemeProvider theme={theme}>
        <Search />
      </ThemeProvider>,
    );

    expect(container.firstChild).toMatchSnapshot();
  });

  it('calls onSubmit', () => {
    const onSubmit = jest.fn();
    const { getByText } = render(
      <ThemeProvider theme={theme}>
        <Search submitLabel="Submit" onSubmit={onSubmit} />
      </ThemeProvider>,
    );

    fireEvent.click(getByText('Submit'));
    expect(onSubmit).toBeCalled();
  });

  it('calls onChange', () => {
    const onChange = jest.fn();
    const { getByPlaceholderText } = render(
      <ThemeProvider theme={theme}>
        <Search placeholder="Type your text" onChange={onChange} />
      </ThemeProvider>,
    );

    fireEvent.change(getByPlaceholderText('Type your text'), {
      target: { value: 'New text' },
    });

    expect(onChange).toBeCalled();
  });
});
