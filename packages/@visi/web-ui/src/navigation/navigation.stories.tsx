import React from 'react';

import { Nav, NavItem } from '.';

export default {
  title: 'Navigation',
  component: Nav,
};

export const normal = () => {
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
};

export const inverse = () => {
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
};
