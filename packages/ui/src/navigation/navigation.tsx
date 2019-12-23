// import React from 'react';
import styled from 'styled-components';

export const Nav = styled.ul`
  display: flex;
  margin: 0;
  padding: 0;
  list-style: none;
`;

export const NavItem = styled.li`
  display: block;

  & > * {
    display: block;
    box-sizing: border-box;
    padding: 12px 21px;
    transition: 0.15s ease-out;
    border-bottom: 1px solid ${({ theme }) => theme.border.normal};
    color: ${({ theme }) => theme.foreground.normal};

    &:hover {
      color: ${({ theme }) => theme.highlight.normal};
      text-decoration: none;
    }

    &.active {
      border-color: ${({ theme }) => theme.highlight.normal};
      color: ${({ theme }) => theme.highlight.normal};
      font-weight: bold;
    }
  }
`;
