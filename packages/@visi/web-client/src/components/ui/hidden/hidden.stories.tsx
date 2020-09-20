import React from 'react';

import { Hidden } from '.';

export default {
  title: 'Hidden',
  component: Hidden,
};

export const Normal = () => (
  <Hidden>This is only visible for screen readers</Hidden>
);
