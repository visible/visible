import { createGlobalStyle } from 'styled-components';

export const GlobalStyle = createGlobalStyle`
html {
  width: 100%;
  height: 100%;
}

body {
  width: 100%;
  height: 100%;
  background-color: ${({ theme }) => theme.background.normal};
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

h1 {
  margin-bottom: 4px;
  font-size: 20px;
  font-weight: bold;
}

h2 {
  margin-bottom: 4px;
  font-size: 18px;
  font-weight: bold;
}

h3 {
  margin-bottom: 4px;
  font-size: 16px;
  font-weight: bold;
}

h4 {
  font-size: 14px;
  font-weight: bold;
}

a {
  color: ${({ theme }) => theme.highlight.normal};
  text-decoration: none;

  &:hover {
    text-decoration: underline;
  }
}
`;
