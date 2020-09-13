import { ContentInfo as UIContentInfo, List, ListItem } from '@visi/web-ui';
import React from 'react';
import { GitHub, Mail, Twitter } from 'react-feather';
import styled from 'styled-components';

import { useTranslation } from '../../utils/i18next';

const Item = styled.a`
  display: flex;
  align-items: center;
  padding: 24px 0;

  svg {
    margin-right: 0.5em;
  }
`;

type ContentInfoProps = JSX.IntrinsicElements['footer'];

export const ContentInfo = ({ ref: _ref, ...props }: ContentInfoProps) => {
  const { t } = useTranslation();

  return (
    <UIContentInfo {...props}>
      <List>
        <ListItem>
          <Item
            href="mailto:n33t5hin@gmail.com"
            target="_blank"
            rel="noopener noreferrer"
          >
            <Mail size={14} />
            {t('content-info.email', 'Contact')}
          </Item>
        </ListItem>
        <ListItem>
          <Item
            href="https://github.com/visible/visible"
            target="_blank"
            rel="noopener noreferrer"
          >
            <GitHub size={14} />
            {t('content-info.github', 'GitHub')}
          </Item>
        </ListItem>
        <ListItem>
          <Item
            href="https://twitter.com/TheGodOfNeet"
            target="_blank"
            rel="noopener noreferrer"
          >
            <Twitter size={14} />
            {t('content-info.twitter', 'Twitter')}
          </Item>
        </ListItem>
      </List>
    </UIContentInfo>
  );
};
