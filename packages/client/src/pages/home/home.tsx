import React from 'react';
import { Search, Nav, NavItem, List, ListItem } from '@visi/ui';
import { NavLink } from 'react-router-dom';
import styled from 'styled-components';

const Banner = styled.header`
  background-color: #ffaa01;
  box-shadow: 0 0 3px rgba(0, 0, 0, 0.16);
`;

const Inner = styled.div`
  display: flex;
  align-items: center;
  justify-content: space-between;
  width: 1080px;
  margin: auto;
  color: white;
`;

const Content = styled.main`
  box-sizing: border-box;
  width: 1080px;
  margin: 24px auto;
  padding: 12px 18px;
  border-radius: 12px;
  background-color: white;
  box-shadow: 0 0 24px rgba(0, 0, 0, 0.05);
`;

const Title = styled.h1`
  margin: 0;
  font-size: 21px;
`;

const Wizard = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  width: 480px;
  margin: auto;

  input {
    width: 400px;
  }
`;

const Description = styled.p`
  color: #666666;
  font-size: 12px;
`;

const ContentInfo = styled.footer`
  width: 1080px;
  margin: auto;
  color: #666666;
  font-size: 12px;
`;

export const Home = () => {
  const navs = [
    { to: '/', text: 'Visible' },
    { to: '/home', text: 'Home' },
    { to: '/notifications', text: 'Notifications' },
  ];

  return (
    <>
      <Banner>
        <Inner>
          <Title>Visible</Title>
          <Nav>
            {navs.map((nav, i) => (
              <NavItem key={nav.to} active={i === 1} appearance="inverse">
                <NavLink to={nav.to}>{nav.text}</NavLink>
              </NavItem>
            ))}
          </Nav>
        </Inner>
      </Banner>

      <Content>
        <Wizard>
          <h2>Diagnose your website</h2>
          <Search submitLabel="送信" placeholder="検索キーワードを入力" />
          <Description>
            URLを入力してサイトのアクセシビリティーを診断します。
            <br />
            診断結果はスコア付けられて、問題のある箇所のコードを指摘し、ソリューションを提案します。
          </Description>
        </Wizard>
      </Content>

      <ContentInfo>
        <List>
          <ListItem>
            <a href="https://github.com/neet/visible">GitHub</a>
          </ListItem>
          <ListItem>
            <a href="https://twitter.com/TheGodOfNeet">Twitter</a>
          </ListItem>
        </List>
      </ContentInfo>
    </>
  );
};
