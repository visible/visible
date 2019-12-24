import { createGlobalStyle } from 'styled-components';

export const GlobalStyle = createGlobalStyle`
html {
  width: 100%;
  height: 100%;
}

body {
  width: 100%;
  height: 100%;
  margin: 0;
  background-color: ${({ theme }) => theme.background.wash};
  color: ${({ theme }) => theme.foreground.normal};
  font-family: "Helvetica Neue", Helvetica, Arial, sans-serif;
  font-size: 14px;
  -webkit-font-smoothing: antialiased;
  line-height: 1.5;
  text-rendering: optimizelegibility;
  font-feature-settings: "kern";
}

img {
  display: block;
  max-width: 100%;
  max-height: 100%;
}

a {
  color: ${({ theme }) => theme.highlight.normal};
  text-decoration: none;

  &:hover {
    text-decoration: underline;
  }
}
`;
