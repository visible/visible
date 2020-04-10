import { theme } from '@visi/resources';
import { ConfigProvider, GlobalStyle } from '@visi/web-ui';
import App, { AppContext, AppProps } from 'next/app';
import Head from 'next/head';
import { useRouter } from 'next/router';
import React from 'react';

import { Banner } from '../components/banner';
import { ContentInfo } from '../components/content-info';
import { appWithTranslation, useTranslation } from '../utils/i18next';

interface CustomAppProps extends AppProps {
  hostname: string;
}

const CustomApp = ({ Component, pageProps, hostname }: CustomAppProps) => {
  const { t } = useTranslation();
  const { pathname } = useRouter();

  const title = t('meta.title', 'Visible');
  const description = t(
    'meta.description',
    '🦉 Visible is an open-source accessibility testing tool works on Node.js and CI',
  );

  return (
    <ConfigProvider theme={theme}>
      <Head>
        <meta charSet="UTF-8" />
        <meta name="viewport" content="width=device-width, initial-scale=1.0" />
        <title>{title}</title>
        <meta name="description" content={description} key="description" />
        <meta property="og:title" content={title} />
        <meta property="og:description" content={description} />

        <link rel="canonical" href={`https://${hostname}/${pathname}`} />
        <meta property="og:url" content={`https://${hostname}/${pathname}`} />
        <meta
          property="og:image"
          content={`https://${hostname}/static/thumbnail.png`}
        />

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

      <div role="application">
        <Banner role="banner" />
        <Component {...pageProps} />
        <ContentInfo role="contentinfo" />
      </div>
    </ConfigProvider>
  );
};

CustomApp.getInitialProps = async (context: AppContext) => {
  const appProps = await App.getInitialProps(context);
  return {
    hostname: context.ctx.req?.headers.host,
    namespacesRequired: ['web-client'],
    ...appProps,
  };
};

export default appWithTranslation(CustomApp);
