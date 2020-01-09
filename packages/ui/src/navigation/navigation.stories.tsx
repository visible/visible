import React from 'react';
import { storiesOf } from '@storybook/react';
import { NavItem, Nav } from '.';

storiesOf('Navigation', module)
  .add('Normal', () => {
    return (
      <Nav>
        <NavItem>
          <a href="#apple">Apple</a>
        </NavItem>
        <NavItem>
          <a href="#facebook">Facebook</a>
        </NavItem>
        <NavItem>
          <a href="#microsoft">Microsoft</a>
        </NavItem>
      </Nav>
    );
  })
  .add('inverse', () => {
    return (
      <div style={{ backgroundColor: 'black' }}>
        <Nav>
          <NavItem appearance="inverse">
            <a href="#apple">Apple</a>
          </NavItem>
          <NavItem appearance="inverse">
            <a href="#facebook">Facebook</a>
          </NavItem>
          <NavItem appearance="inverse">
            <a href="#microsoft">Microsoft</a>
          </NavItem>
        </Nav>
      </div>
    );
  });
