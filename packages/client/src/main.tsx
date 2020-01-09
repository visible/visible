import React from 'react';
import { render } from 'react-dom';
import typeDefs from '@visi/schema';
import { theme, GlobalStyle } from '@visi/ui';
import { BrowserRouter } from 'react-router-dom';
import { ApolloClient } from 'apollo-client';
import { ThemeProvider } from 'styled-components';
import { ApolloProvider } from '@apollo/react-hooks';
import { I18nextProvider } from 'react-i18next';
import { HttpLink } from 'apollo-link-http';
import {
  InMemoryCache,
  IntrospectionFragmentMatcher,
  NormalizedCacheObject,
} from 'apollo-cache-inmemory';
import introspectionResult from './generated/introspection-result';
import { createI18n } from './utils/i18n';
import { Root } from './pages/root';

declare global {
  export interface Window {
    __APOLLO_STATE__: NormalizedCacheObject;
  }
}

const main = async () => {
  const mountNode = document.getElementById('root');
  if (!mountNode) throw Error('No root found');

  const [i18n] = await createI18n();

  const fragmentMatcher = new IntrospectionFragmentMatcher({
    introspectionQueryResultData: introspectionResult,
  });

  const cache = new InMemoryCache({ fragmentMatcher }).restore(
    window.__APOLLO_STATE__,
  );

  const client = new ApolloClient({
    cache,
    typeDefs,
    link: new HttpLink({ uri: '/api/v1' }),
    ssrForceFetchDelay: 100,
  });

  render(
    <ApolloProvider client={client}>
      <ThemeProvider theme={theme}>
        <I18nextProvider i18n={i18n}>
          <BrowserRouter>
            <Root />
          </BrowserRouter>

          <GlobalStyle />
        </I18nextProvider>
      </ThemeProvider>
    </ApolloProvider>,
    mountNode,
  );
};

main();
