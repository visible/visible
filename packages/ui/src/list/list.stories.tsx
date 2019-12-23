import React from 'react';
import { storiesOf } from '@storybook/react';
import { List, ListItem } from '.';

storiesOf('List', module).add('Normal', () => {
  return (
    <List>
      <ListItem>Apple</ListItem>
      <ListItem>Facebook</ListItem>
      <ListItem>Microsoft</ListItem>
    </List>
  );
});
