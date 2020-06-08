import { text } from '@storybook/addon-knobs';
import React from 'react';

import { Typography } from '.';

export default {
  title: 'Typography',
  component: Typography,
};

export const h1 = () => (
  <Typography variant="h1">{text('Text', 'Hello')}</Typography>
);

export const h2 = () => (
  <Typography variant="h2">{text('Text', 'Hello')}</Typography>
);

export const h3 = () => (
  <Typography variant="h3">{text('Text', 'Hello')}</Typography>
);

export const h4 = () => (
  <Typography variant="h4">{text('Text', 'Hello')}</Typography>
);

export const h5 = () => (
  <Typography variant="h5">{text('Text', 'Hello')}</Typography>
);

export const h6 = () => (
  <Typography variant="h6">{text('Text', 'Hello')}</Typography>
);

export const body = () => (
  <Typography variant="body">{text('Text', 'Hello')}</Typography>
);

export const italic = () => (
  <Typography fontStyle="italic">{text('Text', 'Hello')}</Typography>
);

export const wash = () => (
  <Typography color="wash">{text('Text', 'Hello')}</Typography>
);

export const uppercase = () => (
  <Typography textTransform="uppercase">{text('Text', 'Hello')}</Typography>
);
