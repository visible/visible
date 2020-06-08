import styled from 'styled-components';

export type BadgeColor = 'red' | 'green' | 'grey';

export interface BadgeProps {
  variant: BadgeColor;
}

export const Badge = styled.div<BadgeProps>`
  width: min-content;
  padding: 2px 8px;
  border-radius: 4px;
  background-color: ${({ theme, variant }) => theme.fixed[variant]};
  color: white;
  font-size: 12px;
  font-weight: bolder;
`;
