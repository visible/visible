import React from 'react';

import { Content } from '.';

export default {
  title: 'Content',
  component: Content,
};

export const normal = () => <Content>Hello</Content>;
export const skeleton = () => <Content appearance="skeleton">Hello</Content>;