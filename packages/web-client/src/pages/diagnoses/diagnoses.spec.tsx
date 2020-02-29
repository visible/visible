import '@testing-library/jest-dom/extend-expect';

import { cleanup, wait } from '@testing-library/react';
import React from 'react';
import { Route } from 'react-router';

import { render } from '../../../tests/utils';
import {
  Diagnosis,
  FetchDiagnosisSmallDocument,
  ReportType,
} from '../../generated/graphql';
import { Diagnoses } from './diagnoses';

const mocks = [
  {
    request: {
      query: FetchDiagnosisSmallDocument,
      variables: {
        id: '123',
      },
    },
    result: {
      data: {
        diagnosis: {
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

const errorMock = [
  {
    request: {
      query: FetchDiagnosisSmallDocument,
      variables: {
        id: '123',
      },
    },
    error: new Error(),
  },
];

describe('Diagnoses', () => {
  afterEach(() => {
    cleanup();
  });

  it('shows a loading indicator', async () => {
    const { container } = render(
      <Route path="/diagnoses/:id" component={Diagnoses} />,
      { paths: ['/diagnoses/123'], mocks: [] },
    );

    expect(container).toHaveTextContent(/Loading/);
    expect(container).toMatchSnapshot();
    await wait();
  });

  it('fetches data', async () => {
    const { container } = render(
      <Route path="/diagnoses/:id" component={Diagnoses} />,
      { paths: ['/diagnoses/123'], mocks },
    );

    await wait(() => {
      expect(container).toHaveTextContent(/Diagnostics Result/);
      expect(container).toMatchSnapshot();
    });
  });

  it('throws an error', async () => {
    const { container } = render(
      <Route path="/diagnoses/:id" component={Diagnoses} />,
      { paths: ['/diagnoses/123'], mocks: errorMock },
    );

    await wait(() => {
      expect(container).toHaveTextContent(/Error/);
      expect(container).toMatchSnapshot();
    });
  });
});
