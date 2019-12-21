import styled from '../../styled';

export const Badge = styled.span`
  padding: 6px 8px;
  border-radius: 4px;
  background-color: ${({ theme }) => theme.highlight.normal};
  color: white;
  font-size: 12px;
`;
