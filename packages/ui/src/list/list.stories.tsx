import React from 'react';

import { List, ListItem } from '.';

export default {
  title: 'List',
  component: List,
};

export const normal = () => {
  return (
    <List>
      <ListItem>Apple</ListItem>
      <ListItem>Facebook</ListItem>
      <ListItem>Microsoft</ListItem>
    </List>
  );
};
