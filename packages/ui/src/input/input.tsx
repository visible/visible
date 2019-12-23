import { transparentize } from 'polished';
import styled from 'styled-components';

export const Input = styled.input`
  box-sizing: border-box;
  padding: 8px 14px;
  transition: 0.15s ease-in;
  border: 1px solid ${({ theme }) => theme.border.normal};
  border-radius: 4px;
  font-size: 14px;

  &:focus {
    transition: 0.15s ease-out;
    border-color: ${({ theme }) => theme.highlight.normal};
    outline: none;
    box-shadow: 0 0 0 3px
      ${({ theme }) => transparentize(0.6, theme.highlight.normal)};
  }

  &:disabled {
    opacity: 0.5;
    cursor: not-allowed;
  }
`;
