import React from 'react';

import { Image } from '.';

export default {
  title: 'Image',
  component: Image,
};

const imgURL =
  'https://images.unsplash.com/photo-1563822249510-04678c78df85?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=1234&q=80';

export const none = () => <Image src={imgURL} alt="orange" width="300px" />;

export const shadow = () => (
  <Image src={imgURL} alt="orange" width="300px" variant="shadow" />
);
