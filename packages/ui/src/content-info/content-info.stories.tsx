import React from 'react';
import { storiesOf } from '@storybook/react';
import { List, ListItem } from '../list';
import { ContentInfo } from '.';

storiesOf('ContentInfo', module).add('Normal', () => {
  return (
    <ContentInfo>
      <nav>
        <List>
          <ListItem>GitHub</ListItem>
          <ListItem>Twitter</ListItem>
          <ListItem>Email</ListItem>
        </List>
      </nav>
    </ContentInfo>
  );
});
