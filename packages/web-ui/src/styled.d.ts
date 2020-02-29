import 'styled-components';

declare module 'styled-components' {
  export interface DefaultTheme {
    foreground: {
      normal: string;
      wash: string;
    };
    background: {
      normal: string;
      wash: string;
    };
    highlight: {
      normal: string;
    };
    border: {
      normal: string;
    };
  }
}
