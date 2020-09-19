import React from 'react';

import { Button } from '.';

export default {
  title: 'Button',
  component: Button,
};

export const primary = () => <Button variant="primary">text</Button>;

export const primaryDisabled = () => (
  <Button variant="primary" disabled>
    text
  </Button>
);

export const secondary = () => <Button variant="secondary">text</Button>;

export const secondaryDisabled = () => (
  <Button variant="secondary" disabled>
    text
  </Button>
);
