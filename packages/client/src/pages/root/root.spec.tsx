import '@testing-library/jest-dom/extend-expect';

import React from 'react';

import { render } from '../../../tests/utils';
import { Root } from './root';

jest.mock('../home', () => ({
  __esModule: true,
  default: () => 'Home',
}));

jest.mock('../diagnoses', () => ({
  __esModule: true,
  default: () => 'Diagnoses',
}));

jest.mock('../void', () => ({
  __esModule: true,
  default: () => 'Void',
}));

jest.mock('@visi/art/logo-white.png', () => ({
  __esModule: true,
  default: '',
}));

describe('Root', () => {
  it('routes /', () => {
    const { container } = render(<Root />, { paths: ['/'] });
    expect(container).toHaveTextContent(/Home/);
  });

  it('routes /diagnoses/:id', () => {
    const { container } = render(<Root />, {
      paths: ['/diagnoses/123'],
    });
    expect(container).toHaveTextContent(/Diagnoses/);
  });

  it('routes 404', () => {
    const { container } = render(<Root />, {
      paths: ['/this_route_will_never_exist'],
    });
    expect(container).toHaveTextContent(/Void/);
  });
});
