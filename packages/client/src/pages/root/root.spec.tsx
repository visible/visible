import '@testing-library/jest-dom/extend-expect';
import React from 'react';
import { render } from '../../../tests/utils';
import { Root } from './root';

jest.mock('./lazy', () => ({
  Home: () => 'Home',
  Diagnoses: () => 'Diagnoses',
  Void: () => 'Void',
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
