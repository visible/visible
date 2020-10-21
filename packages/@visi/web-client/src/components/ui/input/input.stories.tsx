import React from 'react';

import { Input } from '.';

export default {
  title: 'Input',
  component: Input,
};

export const Text = () => <Input type="text" placeholder="type text here" />;

export const Password = () => (
  <Input type="password" placeholder="type text here" />
);

export const Small = () => (
  <Input type="text" size="small" placeholder="type text here" />
);

export const Large = () => (
  <Input type="text" size="large" placeholder="type text here" />
);
