import styled from 'styled-components';

export interface ImageProps extends React.ImgHTMLAttributes<HTMLImageElement> {
  size: number;
  color?: string;
  appearance?: 'square';
}

export const Image = styled.img<ImageProps>`
  width: ${(p) => p.size}px;
  height: ${(p) => p.size}px;
  border-radius: 8px;
  background-color: ${(p) => p.color};
  object-fit: contain;
  box-shadow: 0 0 6px rgba(0, 0, 0, 0.16);
`;

Image.defaultProps = {
  color: '#000000',
};
