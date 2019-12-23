import React from 'react';
import { Search, Nav, NavItem } from '@visi/ui';
import { NavLink } from 'react-router-dom';
import styled from 'styled-components';

const Banner = styled.header`
  display: flex;
  justify-content: space-between;
  box-shadow: 0 0 3px rgba(0, 0, 0, 0.16);
`;

// const Title = styled.h1`
//   margin
// `;

export const Home = () => {
  const navs = [
    { to: '/', text: 'Visible' },
    { to: '/home', text: 'Home' },
    { to: '/notifications', text: 'Notifications' },
  ];

  return (
    <>
      <Banner>
        <h1>Visible</h1>
        <Nav>
          {navs.map(nav => (
            <NavItem key={nav.to}>
              <NavLink to={nav.to} activeClassName="active">
                {nav.text}
              </NavLink>
            </NavItem>
          ))}
        </Nav>
      </Banner>

      <div>
        <h2>Diagnose your website</h2>
        <Search submitLabel="送信" placeholder="検索キーワードを入力" />
      </div>
    </>
  );
};
