import styled, { css } from 'styled-components';

export interface ContentProps {
  appearance?: 'default' | 'skeleton';
}

export const Content = styled.main<ContentProps>`
  box-sizing: border-box;
  width: 1080px;
  margin: 24px auto;

  ${(props) =>
    props.appearance === 'default' &&
    css`
      padding: 12px 18px;
      border-radius: 12px;
      background-color: white;
      box-shadow: 0 0 24px rgba(0, 0, 0, 0.05);
    `}
`;

Content.defaultProps = {
  appearance: 'default',
};
