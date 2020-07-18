import * as UI from '@visi/web-ui';
import Link from 'next/link';
import React from 'react';
import { Bell, Home } from 'react-feather';
import styled from 'styled-components';

import { useTranslation } from '../../utils/i18next';

const Title = styled.h1`
  margin: 0;
  font-size: 21px;

  img {
    display: flex;
    height: 1.5em;
    place-content: center;
    transition: 0.15s ease-out;
  }

  a:hover > img {
    transition: 0.15s ease-in;
    opacity: 0.8;
  }
`;

const Item = styled.a`
  display: flex !important;
  align-items: center;

  svg {
    margin-right: 0.5em;
  }
`;

type BannerProps = JSX.IntrinsicElements['header'];

export const Banner = (props: BannerProps) => {
  const { t } = useTranslation();

  const navItems = [
    { to: '/', text: t('banner.home', 'Home'), icon: Home },
    {
      to: '/notifications',
      text: t('banner.notifications', 'Notifications'),
      icon: Bell,
    },
  ];

  return (
    <UI.Banner {...props}>
      <Title>
        <Link href="/">
          <a>
            <img alt="Visible" src="/static/logo-white.png" />
          </a>
        </Link>
      </Title>

      <UI.Nav>
        {navItems.map(({ to, text, icon: Icon }) => (
          <UI.NavItem key={to} appearance="inverse">
            <Link href={to}>
              <Item>
                <Icon size={16} />
                {text}
              </Item>
            </Link>
          </UI.NavItem>
        ))}
      </UI.Nav>
    </UI.Banner>
  );
};
