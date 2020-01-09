import React from 'react';
import { Switch, Route } from 'react-router';
import { MockedProvider, MockedResponse, wait } from '@apollo/react-testing';
import { act } from '@testing-library/react';
import { render, makeRouteWrapper } from '../../../tests/utils';
import {
  FetchDiagnosisSmallDocument,
  Diagnosis,
  ReportType,
} from '../../generated/graphql';
import { Diagnoses } from './diagnoses';

const mock: MockedResponse[] = [
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

const errorMock: MockedResponse[] = [
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
  it('fetches data', async () => {
    const { container } = render(
      <MockedProvider mocks={mock} addTypename={true}>
        <Switch>
          <Route path="/diagnoses/:id" component={Diagnoses} />
        </Switch>
      </MockedProvider>,
      { wrapper: makeRouteWrapper('/diagnoses/123') },
    );

    await wait(0);

    expect(container.firstChild).toMatchSnapshot();
  });

  it('throws an error', () => {
    const { container } = render(
      <MockedProvider mocks={errorMock} addTypename={true}>
        <Switch>
          <Route path="/diagnoses/:id" component={Diagnoses} />
        </Switch>
      </MockedProvider>,
      { wrapper: makeRouteWrapper('/diagnoses/123') },
    );

    expect(container.firstChild).toMatchSnapshot();
  });
});
