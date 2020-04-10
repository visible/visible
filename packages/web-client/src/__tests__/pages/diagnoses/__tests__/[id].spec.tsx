import { cleanup, wait } from '@testing-library/react';
import React from 'react';

import {
  Diagnosis,
  FetchDiagnosisSmallDocument,
  ReportType,
} from '../../../../generated/graphql';
import Diagnoses from '../../../../pages/diagnoses/[id]';
import { render } from '../../../../tests/render';

jest.mock('next/router', () => ({
  __esModule: true,
  useRouter: () => ({
    query: { id: '123' },
  }),
}));

const successMocks = [
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

const errorMocks = [
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
    const { container } = render(<Diagnoses />, { mocks: [] });

    expect(container).toHaveTextContent(/Loading/);
    expect(container).toMatchSnapshot();
    await wait();
  });

  it('fetches data', async () => {
    const { container } = render(<Diagnoses />, { mocks: successMocks });

    await wait(() => {
      expect(container).toHaveTextContent(/Diagnostics Result/);
      expect(container).toMatchSnapshot();
    });
  });

  it('throws an error', async () => {
    const { container } = render(<Diagnoses />, { mocks: errorMocks });

    await wait(() => {
      expect(container).toHaveTextContent(/Error/);
      expect(container).toMatchSnapshot();
    });
  });
});
