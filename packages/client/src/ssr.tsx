import {
  InMemoryCache,
  IntrospectionFragmentMatcher,
} from 'apollo-cache-inmemory';
import { ApolloClient } from 'apollo-client';
import { HttpLink } from 'apollo-link-http';
import { i18n } from 'i18next';
import fetch from 'node-fetch';
import React from 'react';
import Helmet from 'react-helmet';
import { ApolloProvider } from '@apollo/react-hooks';
import { getDataFromTree } from '@apollo/react-ssr';
import ReactDOMServer from 'react-dom/server';
import { I18nextProvider } from 'react-i18next';
import { StaticRouter } from 'react-router-dom';
import {
  ServerStyleSheet,
  StyleSheetManager,
  ThemeProvider,
} from 'styled-components';
import { theme } from '@visi/ui';
import { Html } from './components/html';
import introspectionResult from './generated/introspection-result';
import { Root } from './pages/root';
import { createI18n } from './utils/i18n';

export interface RenderParams {
  /** i18next instance */
  language: string;
  /** Request pathname */
  location: string;
  /** Built files manifest */
  manifest: { [K: string]: string };
}

export interface RenderResult {
  statusCode: number;
  staticMarkup: string;
}

const render = async (params: RenderParams): Promise<RenderResult> => {
  const fragmentMatcher = new IntrospectionFragmentMatcher({
    introspectionQueryResultData: introspectionResult,
  });

  const client = new ApolloClient({
    ssrMode: true,
    cache: new InMemoryCache({ fragmentMatcher }),
    link: new HttpLink({
      // eslint-disable-next-line @typescript-eslint/no-explicit-any
      fetch: (fetch as any) as GlobalFetch['fetch'],
      uri: `${process.env.PUBLIC_URL}/api/v1`,
      credentials: 'same-origin',
    }),
  });

  const [i18n] = await createI18n(params.language);
  const context = { statusCode: 200 };
  const sheet = new ServerStyleSheet();

  const App = () => (
    <ApolloProvider client={client}>
      <StaticRouter location={params.location} context={context}>
        <StyleSheetManager sheet={sheet.instance}>
          <I18nextProvider i18n={i18n}>
            <ThemeProvider theme={theme}>
              <Root />
            </ThemeProvider>
          </I18nextProvider>
        </StyleSheetManager>
      </StaticRouter>
    </ApolloProvider>
  );

  const content = await getDataFromTree(<App />);
  const helmet = Helmet.renderStatic();
  const additionalElements = sheet.getStyleElement();

  const staticMarkup = ReactDOMServer.renderToStaticMarkup(
    <Html
      helmet={helmet}
      state={client.extract()}
      manifest={params.manifest}
      content={content}
      elements={additionalElements}
    />,
  );

  return {
    staticMarkup,
    statusCode: context.statusCode,
  };
};

export default render;
