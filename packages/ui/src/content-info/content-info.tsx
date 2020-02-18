// import React from 'react';
import styled from 'styled-components';

import { List } from '../list';

export const ContentInfo = styled.footer`
  transition: 0.15s ease-out;
  opacity: 0.5;
  font-size: 12px;

  a {
    color: ${({ theme }) => theme.foreground.wash};
  }

  ${List} {
    display: flex;
    justify-content: space-around;
    width: 1080px;
    margin: auto;
    padding: 0;
    list-style: none;
  }

  &:hover,
  &:focus {
    transition: 0.15s ease-in;
    opacity: 1;
  }
`;
