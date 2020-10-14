import {
  ApolloClient,
  ApolloLink,
  HttpLink,
  InMemoryCache,
  NormalizedCacheObject,
  split,
} from '@apollo/client';
import { WebSocketLink } from '@apollo/client/link/ws';
import { getMainDefinition } from '@apollo/client/utilities';
import getConfig from 'next/config';
import { useMemo } from 'react';

import introspectionResult from '../generated/introspection-result';

// See next.js' official apollo example:
// https://github.com/vercel/next.js/blob/canary/examples/with-apollo/README.md

let apolloClient: ApolloClient<NormalizedCacheObject>;

const createLink = () => {
  const { publicRuntimeConfig, serverRuntimeConfig } = getConfig();

  const httpApiUrl =
    serverRuntimeConfig.httpApiUrl ?? publicRuntimeConfig.httpApiUrl;
  const wsApiUrl = serverRuntimeConfig.wsApiUrl ?? publicRuntimeConfig.wsApiUrl;

  const httpLink = new HttpLink({
    uri: `${httpApiUrl}/api/v1`,
    credentials: 'same-origin',
  });

  let link: ApolloLink = httpLink;

  // Skip websocket initialization on the server-side
  // https://github.com/apollographql/subscriptions-transport-ws/issues/333
  if (typeof window !== 'undefined') {
    const wsLink = new WebSocketLink({
      uri: `${wsApiUrl}/api/v1`,
      options: {
        reconnect: true,
      },
    });

    link = split(
      ({ query }) => {
        const def = getMainDefinition(query);
        return (
          def.kind === 'OperationDefinition' && def.operation === 'subscription'
        );
      },
      wsLink,
      httpLink,
    );
  }

  return link;
};

const createApolloClient = () => {
  return new ApolloClient({
    ssrMode: typeof window === 'undefined',
    link: createLink(),
    cache: new InMemoryCache({
      possibleTypes: introspectionResult.possibleTypes,
    }),
  });
};

export const initializeApollo = (
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  initialState: any | null = null,
): ApolloClient<NormalizedCacheObject> => {
  const _apolloClient = apolloClient ?? createApolloClient();

  if (initialState != null) {
    const existingCache = _apolloClient.extract();
    _apolloClient.cache.restore({ ...existingCache, ...initialState });
  }

  if (typeof window === 'undefined') return _apolloClient;
  if (apolloClient == null) apolloClient = _apolloClient;

  return _apolloClient;
};

export const useApollo = (
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  initialState: any | null = null,
): ApolloClient<NormalizedCacheObject> => {
  const store = useMemo(() => initializeApollo(initialState), [initialState]);
  return store;
};
