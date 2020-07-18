import { transparentize } from 'polished';
import React from 'react';
import styled from 'styled-components';

const Inner = styled.div`
  display: flex;
  align-items: center;
  justify-content: space-between;
  width: 1080px;
  margin: auto;
  color: white;
`;

const Wrapper = styled.header`
  background-color: ${({ theme }) => theme.highlight.normal};
  box-shadow: 0 0 3px
    ${({ theme }) => transparentize(0.16, theme.highlight.normal)};
`;

export interface BannerProps {
  children: React.ReactNode;
}

export const Banner = (props: BannerProps) => {
  const { children } = props;

  return (
    <Wrapper>
      <Inner>{children}</Inner>
    </Wrapper>
  );
};
