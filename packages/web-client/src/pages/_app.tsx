import { theme } from '@visi/resources';
import { ConfigProvider, GlobalStyle } from '@visi/web-ui';
import { AppProps } from 'next/app';
import Head from 'next/head';
import React from 'react';

import { Banner } from '../components/banner';
import { ContentInfo } from '../components/content-info';
import { appWithTranslation, useTranslation } from '../utils/i18next';

const App = ({ Component, pageProps }: AppProps) => {
  const { t } = useTranslation();

  const title = t('meta.title', 'Visible');
  const description = t(
    'meta.description',
    '🦉 Visible is an open-source accessibility testing tool works on Node.js and CI',
  );

  return (
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
          href="/static/logo.svg"
          color={theme.highlight.normal}
        />
        <link rel="apple-touch-icon" href="/static/apple-touch-icon.png" />
        <meta name="apple-mobile-web-app-title" content={title} />
        <meta name="apple-mobile-web-app-capable" content="yes" />
        <meta name="apple-mobile-web-app-status-bar-style" content="black" />
      </Head>

      <GlobalStyle />
      <Banner role="banner" />
      <Component {...pageProps} />
      <ContentInfo role="contentinfo" />
    </ConfigProvider>
  );
};

export default appWithTranslation(App);
