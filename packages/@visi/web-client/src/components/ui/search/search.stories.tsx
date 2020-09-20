import React from 'react';

import { Search } from '.';

export default {
  title: 'Search',
  component: Search,
};

export const normal = () => <Search placeholder="Type the text">Search</Search>;

export const disabled = () => (
  <Search disabled placeholder="type the text">
    Search
  </Search>
);
