import React from 'react';
import { Switch, Route } from 'react-router';
import { Banner } from '../../components/banner';
import { ContentInfo } from '../../components/content-info';

import Home from '../home';
import Diagnoses from '../diagnoses';
import Void from '../void';

// SuspenseがSSRで使えなかった...
// import { Home, Void, Diagnoses } from './lazy';

export const Root = () => {
  return (
    <>
      <Banner role="banner" />

      <Switch>
        <Route exact path="/" component={Home} />
        <Route path="/diagnoses/:id" component={Diagnoses} />
        <Route component={Void} />
      </Switch>

      <ContentInfo role="contentinfo" />
    </>
  );
};
