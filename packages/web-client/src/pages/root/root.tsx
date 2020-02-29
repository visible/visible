import { GlobalStyle, theme } from '@visi/web-ui';
import React from 'react';
import Helmet from 'react-helmet';
import { useTranslation } from 'react-i18next';
import { Route, Switch, useLocation } from 'react-router';
import { RouteComponentProps } from 'react-router-dom';

import { Banner } from '../../components/banner';
import { ContentInfo } from '../../components/content-info';
import Diagnoses from '../diagnoses';
import Home from '../home';
import Void from '../void';

// SuspenseがSSRで使えなかった...
// import { Home, Void, Diagnoses } from './lazy';

export const renderVoid = (props: RouteComponentProps) => {
  const { staticContext } = props;

  if (staticContext) {
    staticContext.statusCode = 404;
  }

  return <Void />;
};

export const Root = () => {
  const location = useLocation();
  const { t, i18n } = useTranslation();

  const origin = process.env.PUBLIC_URL;

  const href = origin + location.pathname;
  const title = t('meta.title', 'Visible');
  const description = t(
    'meta.description',
    '🦉 Visible is an open-source accessibility testing tool works on Node.js and CI',
  );

  return (
    <>
      <Helmet
        htmlAttributes={{ lang: i18n.language.split('-')[0] }}
        defaultTitle={title}
        titleTemplate={`%s - ${title}`}
      >
        <title>{title}</title>
        <meta name="description" content={description} />
        <meta property="og:title" content={title} />
        <meta property="og:description" content={description} />

        <link rel="canonical" href={href} />
        <meta property="og:url" content={href} />

        <meta property="og:type" content="website" />
        <meta property="og:image" content={`${origin}/thumbnail.png`} />
        <meta name="twitter:card" content="summary_large_image" />

        <link rel="icon" href="/favicon.ico" />
        <link rel="manifest" href="/manifest.json" />
        <meta name="theme-color" content={theme.highlight.normal} />

        <link rel="mask-icon" href="/logo.svg" color={theme.highlight.normal} />
        <link rel="apple-touch-icon" href="/apple-touch-icon.png" />
        <meta name="apple-mobile-web-app-title" content={title} />
        <meta name="apple-mobile-web-app-capable" content="yes" />
        <meta name="apple-mobile-web-app-status-bar-style" content="black" />
      </Helmet>

      <GlobalStyle />
      <Banner role="banner" />

      <Switch>
        <Route exact path="/" component={Home} />
        <Route path="/diagnoses/:id" component={Diagnoses} />
        <Route render={renderVoid} />
      </Switch>

      <ContentInfo role="contentinfo" />
    </>
  );
};
