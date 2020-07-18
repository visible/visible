import React from 'react';

import { Badge } from '.';

export default {
  title: 'Badge',
  component: Badge,
};

export const red = () => <Badge variant="red">badge</Badge>;
export const green = () => <Badge variant="green">badge</Badge>;
export const grey = () => <Badge variant="grey">badge</Badge>;
