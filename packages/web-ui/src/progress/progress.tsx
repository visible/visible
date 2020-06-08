import React from 'react';
import styled, { keyframes } from 'styled-components';

export interface ProgressProps {
  max: number;
  value: number;
}

const pulse = keyframes`
  0% {
    filter: brightness(100%);
  }
  50%{
    filter: brightness(120%);
  }
  100% {
    filter: brightness(100%);
  }
`;

const Wrapper = styled.div`
  box-sizing: border-box;
  width: 100%;
  height: 8px;
  overflow: hidden;
  border-radius: 99px;
  background-color: ${({ theme }) => theme.border.normal};
  box-shadow: inset 0 0 3px rgba(0, 0, 0, 0.1);
`;

const Foreground = styled.div`
  height: 100%;
  transition: 0.15s ease-in;
  animation: ${pulse} 1.5s ease-in infinite;
  border-radius: 99px;
  background-color: ${({ theme }) => theme.highlight.normal};
  box-shadow: inset 0 0 8px #ffae00;
`;

export const Progress = (props: ProgressProps) => {
  const { max, value } = props;

  return (
    <Wrapper>
      <Foreground
        role="presentation"
        style={{ width: `${(value / max) * 100}%` }}
      />
    </Wrapper>
  );
};
