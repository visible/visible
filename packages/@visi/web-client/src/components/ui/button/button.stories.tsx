import React from 'react';

import { Button } from '.';

export default {
  title: 'Button',
  component: Button,
};

export const Primary = () => <Button variant="primary">text</Button>;

export const PrimaryLarge = () => (
  <Button variant="primary" size="large">
    text
  </Button>
);

export const PrimaryDisabled = () => (
  <Button variant="primary" disabled>
    text
  </Button>
);

export const Secondary = () => <Button variant="secondary">text</Button>;

export const SecondaryDisabled = () => (
  <Button variant="secondary" disabled>
    text
  </Button>
);
