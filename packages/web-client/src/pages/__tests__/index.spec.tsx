import { cleanup, fireEvent, wait } from '@testing-library/react';
import React from 'react';

import {
  CreateDiagnosisDocument,
  Diagnosis,
  ReportType,
} from '../../generated/graphql';
import { render } from '../../tests/render';
import Index from '../index';

const push = jest.fn();

jest.mock('next/router', () => ({
  __esModule: true,
  useRouter: () => ({
    push,
  }),
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

describe('Index', () => {
  afterEach(() => {
    cleanup();
  });

  it('matches to the snapshot', () => {
    const { container } = render(<Index />, { mocks });
    expect(container).toMatchSnapshot();
  });

  it('navigates to diagnoses page after a completion of search', async () => {
    const { getByPlaceholderText, getByRole } = render(<Index />, {
      mocks,
    });

    fireEvent.change(getByPlaceholderText('Type URL of the website'), {
      target: { value: 'test' },
    });

    fireEvent.submit(getByRole('search'));

    await wait(() => {
      expect(push).toHaveBeenCalledWith(`/diagnoses/123`);
    });
  });
});
