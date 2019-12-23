import React from 'react';
import { storiesOf } from '@storybook/react';
import { NavItem, Nav } from '.';

storiesOf('Navigation', module).add('Normal', () => {
  return (
    <Nav>
      <NavItem>
        <a href="#apple">Apple</a>
      </NavItem>
      <NavItem>
        <a href="#facebook" className="active">
          Facebook
        </a>
      </NavItem>
      <NavItem>
        <a href="#microsoft">Microsoft</a>
      </NavItem>
    </Nav>
  );
});
