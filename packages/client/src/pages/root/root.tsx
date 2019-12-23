import React, { Suspense } from 'react';
import { Switch, Route } from 'react-router';
import { BrowserRouter } from 'react-router-dom';
import { ApolloClient } from 'apollo-client';
import {
  InMemoryCache,
  IntrospectionFragmentMatcher,
} from 'apollo-cache-inmemory';
import { HttpLink } from 'apollo-link-http';
import { ApolloProvider } from '@apollo/react-hooks';
import { ThemeProvider } from 'styled-components';
import typeDefs from '@visi/schema';
import { theme, GlobalStyle } from '@visi/ui';
import introspectionResult from '../../generated/introspection-result';

const Home = React.lazy(() => import(/* webpackPrefetch: true */ '../home'));

export const Root = () => {
  const fragmentMatcher = new IntrospectionFragmentMatcher({
    introspectionQueryResultData: introspectionResult,
  });

  const cache = new InMemoryCache({ fragmentMatcher }).restore(
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    (window as any).__APOLLO_STATE__,
  );

  const client = new ApolloClient({
    cache,
    typeDefs,
    link: new HttpLink({ uri: '/graphql' }),
    ssrForceFetchDelay: 100,
  });

  return (
    <ApolloProvider client={client}>
      <ThemeProvider theme={theme}>
        <BrowserRouter>
          <Suspense fallback={<div>Loading...</div>}>
            <Switch>
              <Route exact path="/" component={Home} />
            </Switch>
          </Suspense>
        </BrowserRouter>

        <GlobalStyle />
      </ThemeProvider>
    </ApolloProvider>
  );
};
