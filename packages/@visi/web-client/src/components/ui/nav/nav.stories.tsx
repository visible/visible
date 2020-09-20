import React from 'react';

import { Nav } from '.';

export default {
  title: 'Nav',
  component: Nav,
};

export const Normal = () => (
  <Nav
    items={[
      { href: '/foo', as: '/bar', children: 'Click me' },
      { href: '/foo', as: '/bar', children: 'Click me' },
    ]}
  />
);
