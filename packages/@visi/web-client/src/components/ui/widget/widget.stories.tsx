import React from 'react';

import { Widget } from '.';

export default {
  title: 'Widget',
  component: Widget,
};

export const Normal = () => (
  <Widget id="test">
    <Widget.Title>Hello</Widget.Title>
    <Widget.Body>this is the content</Widget.Body>
  </Widget>
);
