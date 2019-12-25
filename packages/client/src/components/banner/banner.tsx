import React from 'react';
import * as UI from '@visi/ui';
import { NavLink } from 'react-router-dom';
import styled from 'styled-components';

const Title = styled.h1`
  margin: 0;
  font-size: 21px;
`;

type BannerProps = JSX.IntrinsicElements['header'];

const activeClassName = 'active';

export const Banner = (props: BannerProps) => {
  const navs = [
    { to: '/', text: 'Visible' },
    { to: '/home', text: 'Home' },
    { to: '/notifications', text: 'Notifications' },
  ];

  return (
    <UI.Banner {...props}>
      <>
        <Title>Visible</Title>
        <UI.Nav>
          {navs.map(nav => (
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
      </>
    </UI.Banner>
  );
};
