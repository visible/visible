import React from 'react';
import { List, ListItem } from '../list';
import { ContentInfo } from '.';

export default {
  title: 'ContentInfo',
  component: ContentInfo,
};

export const normal = () => {
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
};
