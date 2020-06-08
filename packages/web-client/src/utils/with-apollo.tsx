import { ApolloProvider } from '@apollo/react-hooks';
import {
  InMemoryCache,
  IntrospectionFragmentMatcher,
} from 'apollo-cache-inmemory';
import { ApolloClient } from 'apollo-client';
import { ApolloLink, split } from 'apollo-link';
import { HttpLink } from 'apollo-link-http';
import { WebSocketLink } from 'apollo-link-ws';
import { getMainDefinition } from 'apollo-utilities';
import makeWithApollo from 'next-with-apollo';
import React from 'react';

import introspectionResult from '../generated/introspection-result';

export const withApollo = makeWithApollo(
  ({ initialState }) => {
    const fragmentMatcher = new IntrospectionFragmentMatcher({
      introspectionQueryResultData: introspectionResult,
    });

    const httpLink = new HttpLink({
      uri: 'http://localhost:3000/api/v1',
    });
    let link: ApolloLink = httpLink;

    // Skip WebSocket initialisation at the server side
    if (process.browser) {
      const wsLink = new WebSocketLink({
        uri: 'ws://localhost:3000/api/v1',
        options: {
          reconnect: true,
        },
      });

      link = split(
        ({ query }) => {
          const def = getMainDefinition(query);
          return (
            def.kind === 'OperationDefinition' &&
            def.operation === 'subscription'
          );
        },
        wsLink,
        httpLink,
      );
    }

    const cache = new InMemoryCache({ fragmentMatcher }).restore(
      initialState ?? {},
    );

    return new ApolloClient({
      link,
      cache,
    });
  },
  {
    render: ({ Page, props }) => (
      <ApolloProvider client={props.apollo}>
        <Page {...props} />
      </ApolloProvider>
    ),
  },
);
