import { theme } from '@visi/resources';
import { ConfigProvider, GlobalStyle } from '@visi/web-ui';
import { DefaultSeo } from 'next-seo';
import { AppProps } from 'next/app';
import React from 'react';

import { Banner } from '../components/banner';
import { ContentInfo } from '../components/content-info';
import { appWithTranslation, useTranslation } from '../utils/i18next';

type CustomAppProps = AppProps;

const CustomApp = (props: CustomAppProps) => {
  const { t } = useTranslation();
  const { Component, pageProps } = props;

  return (
    <ConfigProvider theme={theme}>
      <DefaultSeo
        titleTemplate={'%s - Visible'}
        openGraph={{ type: 'website', site_name: t('meta.title', 'Visible') }}
      />
      <GlobalStyle />

      <div role="application">
        <Banner role="banner" />
        <Component {...pageProps} />
        <ContentInfo role="contentinfo" />
      </div>
    </ConfigProvider>
  );
};

export default appWithTranslation(CustomApp);
