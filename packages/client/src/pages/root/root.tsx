import React from 'react';
import Helmet from 'react-helmet';
import { theme, GlobalStyle } from '@visi/ui';
import { Switch, Route } from 'react-router';
import { RouteComponentProps } from 'react-router-dom';
import { Banner } from '../../components/banner';
import { ContentInfo } from '../../components/content-info';

import Home from '../home';
import Diagnoses from '../diagnoses';
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
  const publicURL = process.env.PUBLIC_URL;

  return (
    <>
      <Helmet>
        <link rel="icon" href="/favicon.ico" />
        <link rel="mask-icon" href="/logo.svg" color={theme.highlight.normal} />
        <meta name="theme-color" content={theme.highlight.normal} />
        <meta property="og:url" content={publicURL} />
        <meta property="og:image" content={`${publicURL}/thumbnail.png`} />
        <meta name="twitter:card" content="summary_large_image" />
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
