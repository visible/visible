/* cspell: disable */
import React from 'react';

import { Typography } from '.';

export default {
  title: 'Typography',
  component: Typography,
};

export const Heading1 = () => <Typography variant="h1">Text</Typography>;
export const Heading2 = () => <Typography variant="h2">Text</Typography>;
export const Heading3 = () => <Typography variant="h3">Text</Typography>;
export const Heading4 = () => <Typography variant="h4">Text</Typography>;
export const Heading5 = () => <Typography variant="h5">Text</Typography>;
export const Heading6 = () => <Typography variant="h6">Text</Typography>;

export const Paragraph = () => (
  <Typography variant="p">
    Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod
    tempor incididunt ut labore et dolore magna aliqua.
  </Typography>
);

export const Code = () => <Typography variant="code">hello world</Typography>;

export const Mixed = () => (
  <>
    <Typography variant="h4">Hello world</Typography>
    <Typography variant="p">
      Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod
      <Typography variant="code">tempor</Typography>
      incididunt ut labore et dolore magna aliqua.
    </Typography>
  </>
);
