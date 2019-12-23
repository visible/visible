import React from 'react';
import styled, { keyframes } from 'styled-components';

interface ProgressProps {
  progress: number;
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
  position: relative;
`;

const Foreground = styled.div`
  position: absolute;
  top: 0;
  left: 0;
  height: 8px;
  transition: 0.15s ease-in;
  animation: ${pulse} 1.5s ease-in infinite;
  border-radius: 99px;
  background-color: ${({ theme }) => theme.highlight.normal};
`;

const Background = styled.div`
  position: absolute;
  top: 0;
  left: 0;
  width: 100%;
  height: 8px;
  border-radius: 99px;
  background-color: ${({ theme }) => theme.border.normal};
`;

export const Progress = (props: ProgressProps) => {
  const { progress } = props;

  return (
    <Wrapper>
      <Background />
      <Foreground style={{ width: `${progress}%` }} />
    </Wrapper>
  );
};
