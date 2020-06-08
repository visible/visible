export interface Theme {
  foreground: {
    normal: string;
    wash: string;
    inverse: string;
  };
  background: {
    normal: string;
    wash: string;
  };
  highlight: {
    normal: string;
    dark: string;
  };
  border: {
    normal: string;
  };
  fixed: {
    red: string;
    green: string;
    grey: string;
  };
}
