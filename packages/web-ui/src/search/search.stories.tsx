import { action } from '@storybook/addon-actions';
import { boolean, text } from '@storybook/addon-knobs';
import React from 'react';

import { Search } from '.';

export default {
  title: 'Search',
  component: Search,
};

export const normal = () => (
  <Search
    placeholder={text('placeholder', 'Type some text')}
    submitLabel={text('submitLabel', 'Submit')}
    loading={boolean('loading', false)}
    required={boolean('required', false)}
    disabled={boolean('disabled', false)}
    onSubmit={action('onSubmit')}
    onChange={action('onChange')}
  />
);
