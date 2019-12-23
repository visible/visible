import React from 'react';
import { render } from '@testing-library/react';
import { Code } from '.';

describe('Code', () => {
  it('matches snapshot', () => {
    const code = `
    function main(params = {}) {
      var json = JSON.stringify(params);
      console.log(json);
    }
    `;

    const { container } = render(<Code language="javascript">{code}</Code>);
    expect(container.firstChild).toMatchSnapshot();
  });
});
