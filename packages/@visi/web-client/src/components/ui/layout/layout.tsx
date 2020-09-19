import classNames from 'classnames';
import React from 'react';

export type HeaderProps = JSX.IntrinsicElements['header'];

const Header = ({ children, className, ...rest }: HeaderProps) => {
  return (
    <header className={classNames('bg-primary-500', className)} {...rest}>
      {children}
    </header>
  );
};

export type FooterProps = JSX.IntrinsicElements['footer'];

const Footer = ({ children, className, ...rest }: FooterProps) => {
  return (
    <footer className={classNames('bg-gray-300', className)} {...rest}>
      {children}
    </footer>
  );
};

export type MainProps = JSX.IntrinsicElements['main'];

const Main = ({ children, className, ...rest }: MainProps) => {
  return (
    <main className={classNames('w-full', className)} {...rest}>
      {children}
    </main>
  );
};

export type ContainerProps = JSX.IntrinsicElements['div'];

const Container = ({ children, ...rest }: ContainerProps) => {
  return (
    <div
      className={classNames(
        'flex',
        'flex-wrap',
        'w-full',
        'mx-auto',
        'p-4',
        'md:max-w-screen-md',
        'lg:max-w-screen-lg',
        'xl:max-w-screen-xl',
      )}
      {...rest}
    >
      {children}
    </div>
  );
};

export type ContentProps = JSX.IntrinsicElements['div'];

const Content = ({ children, className, ...rest }: ContentProps) => {
  return (
    <article className={classNames('flex-1', className)} {...rest}>
      {children}
    </article>
  );
};

export type AsideProps = JSX.IntrinsicElements['aside'];

const Aside = ({ children, className, ...rest }: AsideProps) => {
  return (
    <aside
      className={classNames(
        'w-full',
        'box-border',
        'lg:pl-8',
        'lg:w-3/12',
        className,
      )}
      {...rest}
    >
      {children}
    </aside>
  );
};

export const Layout = {
  Header,
  Main,
  Container,
  Content,
  Aside,
  Footer,
};
