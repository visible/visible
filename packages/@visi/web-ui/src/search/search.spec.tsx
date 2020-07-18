import { fireEvent } from '@testing-library/react';
import React from 'react';

import { render } from '../render';
import { Search } from '.';

describe('Search', () => {
  it('matches snapshot', () => {
    const { container } = render(<Search />);

    expect(container.firstChild).toMatchSnapshot();
  });

  it('calls onSubmit', () => {
    const onSubmit = jest.fn();
    const { getByText } = render(
      <Search submitLabel="Submit" onSubmit={onSubmit} />,
    );

    fireEvent.click(getByText('Submit'));
    expect(onSubmit).toBeCalled();
  });

  it('calls onChange', () => {
    const onChange = jest.fn();
    const { getByPlaceholderText } = render(
      <Search placeholder="Type your text" onChange={onChange} />,
    );

    fireEvent.change(getByPlaceholderText('Type your text'), {
      target: { value: 'New text' },
    });

    expect(onChange).toBeCalled();
  });
});
