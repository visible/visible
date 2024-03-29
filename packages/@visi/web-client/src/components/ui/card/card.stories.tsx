import React from 'react';

import { Progress } from '../progress';
import { Typography } from '../typography';
import { Card } from '.';

export default {
  title: 'Card',
  component: Card,
};

export const Solid = () => (
  <Card variant="solid">
    <Card.Heading>
      <Typography variant="h6">Hello world</Typography>
    </Card.Heading>
    <Card.Body>singing somewhere in the internet</Card.Body>
  </Card>
);

export const WithProgressBar = () => (
  <Card variant="solid">
    <Card.Heading>
      <Typography variant="h6">Hello world</Typography>
    </Card.Heading>
    <Card.Body>singing somewhere in the internet</Card.Body>
    <Progress max={10} value={5} label="foo" />
  </Card>
);
