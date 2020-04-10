import { theme } from '@visi/resources';
import { ConfigProvider, GlobalStyle } from '@visi/web-ui';
import { AppProps } from 'next/app';
import React from 'react';

import { Banner } from '../components/banner';
import { ContentInfo } from '../components/content-info';
import { appWithTranslation } from '../utils/i18next';

type CustomAppProps = AppProps;

const CustomApp = (props: CustomAppProps) => {
  const { Component, pageProps } = props;

  return (
    <ConfigProvider theme={theme}>
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
