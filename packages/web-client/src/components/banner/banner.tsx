import logo from '@visi/resources/assets/logo-white.png';
import * as UI from '@visi/web-ui';
import React from 'react';
import { useTranslation } from 'react-i18next';
import { Link, NavLink } from 'react-router-dom';
import styled from 'styled-components';

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

type BannerProps = JSX.IntrinsicElements['header'];

const activeClassName = 'active';

export const Banner = (props: BannerProps) => {
  const { t } = useTranslation();

  const navItems = [
    { to: '/', text: t('banner.index', 'Visible') },
    { to: '/home', text: t('banner.home', 'Home') },
    { to: '/notifications', text: t('banner.notifications', 'Notifications') },
  ];

  return (
    <UI.Banner {...props}>
      <Title>
        <Link to="/">
          <img alt="Visible" src={logo} />
        </Link>
      </Title>

      <UI.Nav>
        {navItems.map(nav => (
          <UI.NavItem
            key={nav.to}
            activeClassName={activeClassName}
            appearance="inverse"
          >
            <NavLink exact to={nav.to} activeClassName={activeClassName}>
              {nav.text}
            </NavLink>
          </UI.NavItem>
        ))}
      </UI.Nav>
    </UI.Banner>
  );
};
