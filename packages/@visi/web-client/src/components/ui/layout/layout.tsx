import classNames from 'classnames';
import React from 'react';

export type HeaderProps = JSX.IntrinsicElements['header'];

const Header = ({ children, className, ...rest }: HeaderProps) => {
  return (
    <header
      className={classNames('bg-primary-500', 'shadow', 'z-10', className)}
      {...rest}
    >
      {children}
    </header>
  );
};

export type FooterProps = JSX.IntrinsicElements['footer'];

const Footer = ({ children, className, ...rest }: FooterProps) => {
  return (
    <footer
      className={classNames(
        'border-t',
        'border-gray-300',
        'bg-gray-200',
        className,
      )}
      {...rest}
    >
      {children}
    </footer>
  );
};

export type PageProps = JSX.IntrinsicElements['div'];

const Page = ({ children, className, ...rest }: PageProps) => {
  return (
    <div className={classNames('w-full', className)} {...rest}>
      {children}
    </div>
  );
};

export type ContainerProps = JSX.IntrinsicElements['div'];

const Container = ({ children, className, ...rest }: ContainerProps) => {
  return (
    <div
      className={classNames(
        'flex',
        'flex-wrap',
        'items-start',
        'relative',
        'w-full',
        'mx-auto',
        'box-border',
        'p-3',
        'md:max-w-screen-md',
        'lg:max-w-screen-lg',
        'xl:max-w-screen-xl',
        className,
      )}
      {...rest}
    >
      {children}
    </div>
  );
};

// Container.defaultProps = {
//   padding: true,
// };

export type MainSize = 'single' | 'two-column';

export type MainProps = JSX.IntrinsicElements['main'] & {
  size: MainSize;
};

const Main = ({ children, className, size, ...rest }: MainProps) => {
  return (
    <main
      className={classNames(
        'w-full',
        size === 'two-column' && 'lg:w-9/12',
        className,
      )}
      {...rest}
    >
      {children}
    </main>
  );
};

Main.defaultProps = {
  size: 'single',
};

export type AsideProps = JSX.IntrinsicElements['aside'];

const Aside = ({ children, className, ...rest }: AsideProps) => {
  return (
    <aside
      className={classNames(
        'w-full',
        'border-box',
        'sticky',
        'right-0',
        'lg:pl-8',
        'lg:w-3/12',
        'space-y-8',
        className,
      )}
      style={{ top: '0.75rem' }}
      {...rest}
    >
      {children}
    </aside>
  );
};

export const Layout = {
  Header,
  Page,
  Container,
  Main,
  Aside,
  Footer,
};
