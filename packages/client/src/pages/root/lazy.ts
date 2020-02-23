import React from 'react';

export const Home = React.lazy(() =>
  import(/* webpackPrefetch: true */ '../home'),
);

export const Void = React.lazy(() =>
  import(/* webpackPrefetch: true */ '../void'),
);

export const Diagnoses = React.lazy(() =>
  import(/* webpackPrefetch: true */ '../diagnoses'),
);
