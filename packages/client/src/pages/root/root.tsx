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
import { i18n } from 'i18next';
import { I18nextProvider } from 'react-i18next';
import typeDefs from '@visi/schema';
import { theme, GlobalStyle } from '@visi/ui';
import introspectionResult from '../../generated/introspection-result';

import { Banner } from '../../components/banner';
import { ContentInfo } from '../../components/content-info';

const Home = React.lazy(() => import(/* webpackPrefetch: true */ '../home'));
const Void = React.lazy(() => import(/* webpackPrefetch: true */ '../void'));

type RootProps = {
  i18n: i18n;
};

export const Root = (props: RootProps) => {
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
        <I18nextProvider i18n={props.i18n}>
          <BrowserRouter>
            <Banner role="banner" />

            <Suspense fallback={<div>Loading...</div>}>
              <Switch>
                <Route exact path="/" component={Home} />
                <Route component={Void} />
              </Switch>
            </Suspense>

            <ContentInfo role="contentinfo" />
          </BrowserRouter>

          <GlobalStyle />
        </I18nextProvider>
      </ThemeProvider>
    </ApolloProvider>
  );
};
