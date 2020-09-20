import React from 'react';

import { Layout } from '.';

export default {
  title: 'Layout',
  component: Layout,
};

export const Normal = () => (
  <div>
    <Layout.Header>header</Layout.Header>

    <Layout.Content>
      <Layout.Main>main</Layout.Main>
      <Layout.Aside>aside</Layout.Aside>
    </Layout.Content>

    <Layout.Footer>footer</Layout.Footer>
  </div>
);
