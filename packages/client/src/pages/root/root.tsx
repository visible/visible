import React, { Suspense } from 'react';
import { Switch, Route } from 'react-router';
import { Banner } from '../../components/banner';
import { ContentInfo } from '../../components/content-info';
import { Home, Void, Diagnoses } from './lazy';

export const Root = () => {
  return (
    <>
      <Banner role="banner" />

      <Suspense fallback={<div>Loading...</div>}>
        <Switch>
          <Route exact path="/" component={Home} />
          <Route path="/diagnoses/:id" component={Diagnoses} />
          <Route component={Void} />
        </Switch>
      </Suspense>

      <ContentInfo role="contentinfo" />
    </>
  );
};
