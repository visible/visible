import '@testing-library/jest-dom/extend-expect';
import React from 'react';
import { render, makeRouteWrapper } from '../../../tests/utils';
import { Root } from './root';

jest.mock('./lazy', () => ({
  Home: () => 'Home',
  Diagnoses: () => 'Diagnoses',
  Void: () => 'Void',
}));

describe('Root', () => {
  it('routes /', () => {
    const { container } = render(<Root />, { wrapper: makeRouteWrapper('/') });
    expect(container).toHaveTextContent(/Home/);
  });

  it('routes /diagnoses/:id', () => {
    const { container } = render(<Root />, {
      wrapper: makeRouteWrapper('/diagnoses/123'),
    });
    expect(container).toHaveTextContent(/Diagnoses/);
  });

  it('routes 404', () => {
    const { container } = render(<Root />, {
      wrapper: makeRouteWrapper('/this_route_will_never_exist'),
    });
    expect(container).toHaveTextContent(/Void/);
  });
});
