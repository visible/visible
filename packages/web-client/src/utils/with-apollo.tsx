import { ApolloProvider } from '@apollo/react-hooks';
// import typeDefs from '@visi/web-schema';
import {
  InMemoryCache,
  IntrospectionFragmentMatcher,
} from 'apollo-cache-inmemory';
import { ApolloClient } from 'apollo-client';
import { HttpLink } from 'apollo-link-http';
import makeWithApollo from 'next-with-apollo';
import React from 'react';

import introspectionResult from '../generated/introspection-result';

export const withApollo = makeWithApollo(
  ({ initialState }) => {
    const fragmentMatcher = new IntrospectionFragmentMatcher({
      introspectionQueryResultData: introspectionResult,
    });

    const link = new HttpLink({
      uri: '/api/v1',
    });

    const cache = new InMemoryCache({ fragmentMatcher }).restore(
      initialState ?? {},
    );

    return new ApolloClient({
      link,
      cache,
      // typeDefs,
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
