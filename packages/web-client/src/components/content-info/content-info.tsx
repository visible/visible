import * as UI from '@visi/web-ui';
import React from 'react';

type ContentInfoProps = JSX.IntrinsicElements['footer'];

export const ContentInfo = ({ ref: _ref, ...props }: ContentInfoProps) => {
  return (
    <UI.ContentInfo {...props}>
      <UI.List>
        <UI.ListItem>
          <a href="mailto:n33t5hin@gmail.com">Contact</a>
        </UI.ListItem>
        <UI.ListItem>
          <a href="https://github.com/neet/visible">GitHub</a>
        </UI.ListItem>
        <UI.ListItem>
          <a href="https://twitter.com/TheGodOfNeet">Twitter</a>
        </UI.ListItem>
      </UI.List>
    </UI.ContentInfo>
  );
};
