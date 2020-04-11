import { theme } from '@visi/resources';
import { ConfigProvider, GlobalStyle } from '@visi/web-ui';
import { DefaultSeo } from 'next-seo';
import { AppProps } from 'next/app';
import Head from 'next/head';
import React from 'react';

import { Banner } from '../components/banner';
import { ContentInfo } from '../components/content-info';
import { appWithTranslation, useTranslation } from '../utils/i18next';

type CustomAppProps = AppProps;

const CustomApp = (props: CustomAppProps) => {
  const { t } = useTranslation();
  const { Component, pageProps } = props;
  const title = t('meta.title', 'Visible');

  return (
    <ConfigProvider theme={theme}>
      <DefaultSeo
        titleTemplate={'%s - Visible'}
        title={title}
        openGraph={{ type: 'website', title, site_name: title }}
      />

      <GlobalStyle />

      <Head>
        <link rel="icon" href="/favicon.ico" />
        <link rel="manifest" href="/api/manifest" />
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

      <div role="application">
        <Banner role="banner" />
        <Component {...pageProps} />
        <ContentInfo role="contentinfo" />
      </div>
    </ConfigProvider>
  );
};

export default appWithTranslation(CustomApp);
