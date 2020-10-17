import classNames from 'classnames';
import Link from 'next/link';
import { useRouter } from 'next/router';
import React, { createContext, useContext } from 'react';

export type NavVariant = 'normal' | 'invert';
export type NavSpace = 'lg' | 'md' | 'sm';

const NavContext = createContext<{
  variant?: NavVariant;
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
          'py-2',
          'px-3',
          'rounded-md',
          'text-sm',
          'font-semibold',
          'space-x-2',
          'transition-colors',
          'duration-75',
          variant === 'normal' &&
            (active
              ? ['text-gray-600', 'bg-gray-300']
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

const mapSpace = (space: NavSpace) => {
  switch (space) {
    case 'lg':
      return 'space-x-8';
    case 'md':
      return 'space-x-4';
    case 'sm':
      return 'space-x-2';
  }
};

export type NavProps = JSX.IntrinsicElements['nav'] & {
  items: NavItem[];
  variant: NavVariant;
  space: NavSpace;
};

export const Nav = ({ items, variant, space, ...rest }: NavProps) => {
  return (
    <NavContext.Provider value={{ variant }}>
      <nav {...rest}>
        <ul className={classNames('flex', mapSpace(space))}>
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
};
