import { cleanup } from '@testing-library/react';
import React from 'react';

import App from '../_app';
import { render } from '../../tests/render';

jest.mock('next/router', () => ({
  __esModule: true,
  useRouter: () => ({
    pathname: 'page',
  }),
}));

describe('App', () => {
  afterEach(() => {
    cleanup();
  });

  it('matches to the snapshot', () => {
    const { container } = render(
      <App
        Component={React.Fragment}
        hostname="https://visi.dev"
        pageProps={{}}
      />,
    );

    expect(container).toMatchSnapshot();
  });
});
