import '@fortawesome/fontawesome-svg-core/styles.css';
import '../styles/index.css';

import { ApolloProvider } from '@apollo/client';
import { config } from '@fortawesome/fontawesome-svg-core';
import { DefaultSeo } from 'next-seo';
import App, { AppContext, AppProps } from 'next/app';
import Head from 'next/head';
import React from 'react';

import tailwind from '../../tailwind.config';
import { Banner } from '../components/banner';
import { ContentInfo } from '../components/content-info';
import { useGoogleAnalytics } from '../hooks/use-google-analytics';
import { useApollo } from '../utils/apollo';
import { appWithTranslation, useTranslation } from '../utils/i18next';

config.autoAddCss = false;

type CustomAppProps = AppProps;

const CustomApp = ({ Component, pageProps }: CustomAppProps) => {
  const { t, i18n } = useTranslation();
  const apolloClient = useApollo(pageProps.initialApolloState);
  useGoogleAnalytics();

  const title = t('meta.title', 'Visible');

  return (
    <ApolloProvider client={apolloClient}>
      <DefaultSeo
        titleTemplate={'%s - Visible'}
        title={title}
        description={t('meta.description')}
        openGraph={{
          type: 'website',
          site_name: title,
          images: [
            {
              url: `https://visi.dev/static/thumbnail-${i18n.language}.png`,
              alt: 'Thumbnail',
            },
          ],
        }}
        twitter={{
          site: '@visible_hq',
          cardType: 'summary_large_image',
        }}
      />

      <Head>
        <link rel="icon" href="/favicon.ico" />
        <link rel="manifest" href="/api/manifest" />
        <meta name="theme-color" content={tailwind.theme.colors.primary[500]} />

        <link
          rel="mask-icon"
          href="/static/logo.svg"
          color={tailwind.theme.colors.primary[500]}
        />
        <link rel="apple-touch-icon" href="/static/apple-touch-icon.png" />
        <meta name="apple-mobile-web-app-title" content={title} />
        <meta name="apple-mobile-web-app-capable" content="yes" />
        <meta name="apple-mobile-web-app-status-bar-style" content="black" />
      </Head>

      <div className="flex flex-col min-h-screen">
        <Banner />
        <div className="flex-1">
          <Component {...pageProps} />
        </div>
        <ContentInfo />
      </div>
    </ApolloProvider>
  );
};

CustomApp.getInitialProps = async (ctx: AppContext) => ({
  ...(await App.getInitialProps(ctx)),
});

export default appWithTranslation(CustomApp);
