import React from 'react';
import { render } from '@testing-library/react';
import { ThemeProvider } from 'styled-components';
import { theme } from '../theme';
import { ContentInfo } from '.';

describe('ContentInfo', () => {
  it('matches snapshot', () => {
    const { container } = render(
      <ThemeProvider theme={theme}>
        <ContentInfo />
      </ThemeProvider>,
    );
    expect(container.firstChild).toMatchSnapshot();
  });
});
