import classNames from 'classnames';
import Link from 'next/link';
import { useRouter } from 'next/router';
import React, { createContext, useContext } from 'react';

export type NavVariant = 'normal' | 'invert';
export type NavDirection = 'horizontal' | 'vertical';
export type NavSpace = 'lg' | 'md' | 'sm';

const NavContext = createContext<{
  variant?: NavVariant;
  direction?: NavDirection;
}>({});

const useVariant = () => {
  return useContext(NavContext).variant;
};

export interface NavItem {
  href: string;
  as?: string;
  children: React.ReactNode;
  icon?: React.ReactNode;
}

const Item = (props: NavItem) => {
  const { href, as: _as, children, icon } = props;

  const router = useRouter();
  const variant = useVariant();

  const active = router.pathname === href;
  const isExternal = _as == null;

  const Wrapper = isExternal
    ? React.Fragment
    : ({ children }: { children: React.ReactNode }) => (
        <Link href={href} as={_as}>
          {children}
        </Link>
      );

  return (
    <Wrapper>
      <a
        className={classNames(
          'p-2',
          'rounded',
          'text-sm',
          'font-semibold',
          'space-x-2',
          variant === 'normal' &&
            (active
              ? ['bg-primary-300', 'text-primary-500']
              : ['text-gray-600', 'hover:bg-gray-300']),
          variant === 'invert' &&
            (active
              ? ['text-white', 'bg-primary-600']
              : ['text-white', 'hover:bg-primary-600']),
        )}
        {...(isExternal ? { href, target: '_blank', rel: 'noopener' } : {})}
      >
        {icon && <span>{icon}</span>}
        <span>{children}</span>
      </a>
    </Wrapper>
  );
};

export interface NavProps {
  items: NavItem[];
  variant: NavVariant;
  direction: NavDirection;
  space: NavSpace;
}

export const Nav = (props: NavProps) => {
  const { items, variant, direction, space } = props;

  const infix = {
    lg: '8',
    md: '4',
    sm: '2',
  }[space];

  return (
    <NavContext.Provider value={{ variant, direction }}>
      <nav>
        <ul
          className={classNames(
            'flex',
            direction === 'horizontal'
              ? ['flex-row', `space-x-${infix}`]
              : ['flex-col', `space-y-${infix}`],
          )}
        >
          {items.map((item, i) => (
            <li key={`${item.href}-${i}`}>
              <Item {...item} />
            </li>
          ))}
        </ul>
      </nav>
    </NavContext.Provider>
  );
};

Nav.defaultProps = {
  space: 'md',
  variant: 'normal',
  direction: 'horizontal',
};
