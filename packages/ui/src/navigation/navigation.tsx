import React from 'react';
import styled from 'styled-components';

type NavAppearance = 'inverse' | 'default';

const NavWrapper = styled.ul`
  display: flex;
  margin: 0;
  padding: 0;
  list-style: none;
`;

interface NavProps {
  children: React.ReactNode;
}

export const Nav = (props: NavProps) => {
  const { children } = props;

  return <NavWrapper>{children}</NavWrapper>;
};

const NavItemBorder = styled.div<NavItemWrapperProps>`
  width: 100%;
  height: 1.5px;
  background-color: ${({ theme, appearance }) =>
    ({
      default: theme.highlight.normal,
      inverse: 'white',
    }[appearance])};
`;

interface NavItemWrapperProps {
  active: boolean;
  appearance: NavAppearance;
}

export const NavItemWrapper = styled.li<NavItemWrapperProps>`
  display: block;
  margin: 0 18px;

  &:last-child {
    margin-right: 0;
  }

  & > a {
    display: block;
    box-sizing: border-box;
    padding: 12px 0px;
    transition: 0.15s ease-out;
    color: ${({ theme, appearance, active }) =>
      ({
        inverse: active ? 'rgba(255, 255, 255, 1)' : 'rgba(255, 255, 255, 0.8)',
        default: theme.foreground.normal,
      }[appearance])};
    font-weight: ${({ active }) => active && 'bold'};

    &:hover {
      color: ${({ theme, appearance }) =>
        ({
          inverse: 'rgba(255, 255, 255, 1)',
          default: theme.highlight.normal,
        }[appearance])};
      text-decoration: none;
    }
  }

  ${NavItemBorder} {
    display: ${({ active }) => (active ? 'block' : 'none')};
  }
`;

interface NavItemProps {
  children: React.ReactNode;
  active?: boolean;
  appearance: NavAppearance;
}

export const NavItem = (props: NavItemProps) => {
  const { children, active = false, appearance } = props;

  return (
    <NavItemWrapper active={active} appearance={appearance}>
      {children}
      <NavItemBorder active={active} appearance={appearance} />
    </NavItemWrapper>
  );
};

NavItem.defaultProps = {
  active: false,
  appearance: 'default',
};
