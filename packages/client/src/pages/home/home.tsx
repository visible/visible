import * as React from 'react';
import { ThemeProvider } from 'styled-components';
import { theme } from '@visi/ui/dist/theme';
import { Search } from '@visi/ui/dist/molecules/search';

export const Home = () => {
  return (
    <ThemeProvider theme={theme}>
      Visible
      <Search submitLabel="送信" placeholder="検索キーワードを入力" />
    </ThemeProvider>
  );
};
