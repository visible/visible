import React from 'react';
import styled, { css } from 'styled-components';

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
  visibility: none;
  width: 100%;
  height: 1.5px;
  background-color: ${({ theme, appearance }) =>
    ({
      default: theme.highlight.normal,
      inverse: 'white',
    }[appearance])};
`;

interface NavItemWrapperProps {
  activeClassName: string;
  appearance: NavAppearance;
}

export const NavItemWrapper = styled.li<NavItemWrapperProps>`
  display: flex;
  margin: 0 18px;
  font-weight: bold;

  &:last-child {
    margin-right: 0;
  }

  & > a {
    display: block;
    box-sizing: border-box;
    padding: 12px 0px;
    transition: 0.15s ease-out;
    color: ${({ theme, appearance }) =>
      ({
        inverse: 'rgba(255, 255, 255, 0.6)',
        default: theme.foreground.normal,
      }[appearance])};

    &:hover {
      color: ${({ theme, appearance }) =>
        ({
          inverse: 'rgba(255, 255, 255, 0.4)',
          default: theme.highlight.normal,
        }[appearance])};
      text-decoration: none;
    }

    ${({ activeClassName, appearance }) => css`
      &.${activeClassName} {
        ${appearance === 'inverse' &&
          css`
            color: rgba(255, 255, 255, 1);
          `}

        ${NavItemBorder} {
          visibility: display;
        }
      }
    `}
  }
`;

interface NavItemProps {
  children: React.ReactNode;
  activeClassName?: string;
  appearance: NavAppearance;
}

export const NavItem = (props: NavItemProps) => {
  const { children, activeClassName = '', appearance } = props;

  return (
    <NavItemWrapper activeClassName={activeClassName} appearance={appearance}>
      {children}
      {/* <NavItemBorder
        activeClassName={activeClassName}
        appearance={appearance}
      /> */}
    </NavItemWrapper>
  );
};

NavItem.defaultProps = {
  activeClassName: '',
  appearance: 'default',
};
