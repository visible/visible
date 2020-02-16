import React from 'react';
import '@testing-library/jest-dom/extend-expect';
import { fireEvent, cleanup, wait } from '@testing-library/react';
import { Route } from 'react-router';
import { render } from '../../../tests/utils';
import {
  CreateDiagnosisDocument,
  ReportType,
  Diagnosis,
} from '../../generated/graphql';
import { Home } from './home';

jest.mock('@visi/art/diagnose.svg', () => ({
  __esModule: true,
  default: '',
}));

const mocks = [
  {
    request: {
      query: CreateDiagnosisDocument,
      variables: {
        url: 'test',
      },
    },
    result: {
      data: {
        createDiagnosis: {
          __typename: 'Diagnosis',
          id: '123',
          score: {
            __typename: 'Score',
            error: 1,
            warn: 1,
            ok: 0,
          },
          screenshot: '',
          reports: [
            {
              __typename: 'Report',
              id: '456',
              type: ReportType.Ok,
              name: 'img-alt',
              message: 'error',
              xpath: '/html/body',
              html: '<body></body>',
              css: '',
            },
          ],
        } as Diagnosis,
      },
    },
  },
];

describe('Home', () => {
  afterEach(() => {
    cleanup();
  });

  it('matches to the snapshot', () => {
    const { container } = render(<Home />, { mocks });
    expect(container).toMatchSnapshot();
  });

  it('navigates to diagnoses page after a completion of search', async () => {
    const { container, getByPlaceholderText, getByRole } = render(
      <>
        <Route exact path="/" component={Home} />
        <Route path="/diagnoses/:id" render={() => 'diagnoses'} />
      </>,
      {
        mocks,
      },
    );

    fireEvent.change(getByPlaceholderText('Type URL of the website'), {
      target: { value: 'test' },
    });

    fireEvent.submit(getByRole('search'));

    await wait(() => {
      expect(container).toHaveTextContent('diagnoses');
    });
  });
});
