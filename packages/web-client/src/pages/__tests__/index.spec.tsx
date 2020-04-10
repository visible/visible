import '@testing-library/jest-dom/extend-expect';

import { cleanup } from '@testing-library/react';
import React from 'react';

import {
  CreateDiagnosisDocument,
  Diagnosis,
  ReportType,
} from '../../generated/graphql';
import { render } from '../../tests/render';
import Index from '../index';

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

  test.todo('check if submit works');
});
