import React from 'react';

import { Search } from '.';

export default {
  title: 'Search',
  component: Search,
};

export const Normal = () => (
  <Search id="foo" placeholder="Type the text">
    Search
  </Search>
);

export const Large = () => (
  <Search id="foo" placeholder="Type the text" size="large">
    Search
  </Search>
);

export const Disabled = () => (
  <Search disabled id="foo" placeholder="type the text">
    Search
  </Search>
);
