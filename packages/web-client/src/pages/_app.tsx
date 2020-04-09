import { ApolloProvider } from '@apollo/react-hooks';
import { theme } from '@visi/resources';
// import typeDefs from '@visi/web-schema';
import { ConfigProvider, GlobalStyle } from '@visi/web-ui';
import {
  InMemoryCache,
  IntrospectionFragmentMatcher,
} from 'apollo-cache-inmemory';
import { ApolloClient } from 'apollo-client';
import { HttpLink } from 'apollo-link-http';
import withApollo, { WithApolloProps } from 'next-with-apollo';
import { AppProps } from 'next/app';
import Head from 'next/head';
import React from 'react';

import { Banner } from '../components/banner';
import { ContentInfo } from '../components/content-info';
import introspectionResult from '../generated/introspection-result';
import { useTranslation } from '../i18next';

const App = ({
  Component,
  pageProps,
  apollo,
}: AppProps & WithApolloProps<InMemoryCache>) => {
  const { t } = useTranslation();

  // const href = location.href;
  const title = t('meta.title', 'Visible');
  const description = t(
    'meta.description',
    '🦉 Visible is an open-source accessibility testing tool works on Node.js and CI',
  );

  return (
    <ApolloProvider client={apollo}>
      <ConfigProvider theme={theme}>
        <Head>
          <title>{title}</title>
          <meta name="description" content={description} />
          <meta property="og:title" content={title} />
          <meta property="og:description" content={description} />

          {/*
          <link rel="canonical" href={href} />
          <meta property="og:url" content={href} />
          <meta property="og:image" content={`${origin}/thumbnail.png`} />
        */}

          <meta property="og:type" content="website" />
          <meta name="twitter:card" content="summary_large_image" />

          <link rel="icon" href="/favicon.ico" />
          <link rel="manifest" href="/manifest.json" />
          <meta name="theme-color" content={theme.highlight.normal} />

          <link
            rel="mask-icon"
            href="/logo.svg"
            color={theme.highlight.normal}
          />
          <link rel="apple-touch-icon" href="/apple-touch-icon.png" />
          <meta name="apple-mobile-web-app-title" content={title} />
          <meta name="apple-mobile-web-app-capable" content="yes" />
          <meta name="apple-mobile-web-app-status-bar-style" content="black" />
        </Head>

        <GlobalStyle />
        <Banner role="banner" />
        <Component {...pageProps} />
        <ContentInfo role="contentinfo" />
      </ConfigProvider>
    </ApolloProvider>
  );
};

export default withApollo(({ initialState = {} }) => {
  const fragmentMatcher = new IntrospectionFragmentMatcher({
    introspectionQueryResultData: introspectionResult,
  });

  const cache = new InMemoryCache({ fragmentMatcher }).restore(initialState);

  return new ApolloClient({
    cache,
    // typeDefs,
    link: new HttpLink({ uri: '/api/v1' }),
    ssrForceFetchDelay: 100,
  });
})(App);
