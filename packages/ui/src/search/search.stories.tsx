import { action } from '@storybook/addon-actions';
import { boolean } from '@storybook/addon-knobs';
import React from 'react';

import { Search } from '.';

export default {
  title: 'Search',
  component: Search,
};

export const normal = () => (
  <Search
    placeholder="Type some keyword"
    submitLabel="Search"
    required={boolean('required', false)}
    disabled={boolean('disabled', false)}
    onSubmit={action('onSubmit')}
    onChange={action('onChange')}
  />
);
