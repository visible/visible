import React from 'react';
import { storiesOf } from '@storybook/react';
import { action } from '@storybook/addon-actions';
import { boolean } from '@storybook/addon-knobs';
import { Search } from '.';

export default {
  title: 'Search',
  component: Search,
};

export const normal = () => {
  const required = boolean('required', false);
  const disabled = boolean('disabled', false);

  return (
    <Search
      placeholder="Type some keyword"
      submitLabel="Search"
      required={required}
      disabled={disabled}
      onSubmit={action('onSubmit')}
      onChange={action('onChange')}
    />
  );
});
