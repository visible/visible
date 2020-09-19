import React from 'react';

import { Input } from '.';

export default {
  title: 'Input',
  component: Input,
};

export const text = () => <Input type="text" placeholder="type text here" />;

export const password = () => (
  <Input type="password" placeholder="type text here" />
);
