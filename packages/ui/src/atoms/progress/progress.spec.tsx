import React from 'react';
import { render } from '@testing-library/react';
import { ThemeProvider } from 'styled-components';
import { theme } from '../../theme';
import { Progress } from '.';

describe('Progress', () => {
  it('matches snapshot', () => {
    const { container } = render(
      <ThemeProvider theme={theme}>
        <Progress progress={50} />
      </ThemeProvider>,
    );
    expect(container.firstChild).toMatchSnapshot();
  });
});
