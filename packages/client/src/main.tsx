import { ApolloProvider } from '@apollo/react-hooks';
import typeDefs from '@visi/schema';
import { theme } from '@visi/ui';
import {
  InMemoryCache,
  IntrospectionFragmentMatcher,
} from 'apollo-cache-inmemory';
import { ApolloClient } from 'apollo-client';
import { HttpLink } from 'apollo-link-http';
import React from 'react';
import { render } from 'react-dom';
import { I18nextProvider } from 'react-i18next';
import { BrowserRouter } from 'react-router-dom';
import { ThemeProvider } from 'styled-components';

import introspectionResult from './generated/introspection-result';
import { Root } from './pages/root';
import { createI18n } from './utils/i18n';

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
        </I18nextProvider>
      </ThemeProvider>
    </ApolloProvider>,
    mountNode,
  );
};

main();
