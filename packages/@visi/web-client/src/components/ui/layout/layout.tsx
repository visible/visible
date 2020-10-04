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

export type MainProps = JSX.IntrinsicElements['main'];

const Main = ({ children, className, ...rest }: MainProps) => {
  return (
    <main className={classNames('w-full', className)} {...rest}>
      {children}
    </main>
  );
};

export type ContainerProps = JSX.IntrinsicElements['div'];

const Container = ({ children, className, ...rest }: ContainerProps) => {
  return (
    <div
      className={classNames(
        'flex',
        'flex-wrap',
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
        'lg:ml-8',
        'lg:w-3/12',
        'space-y-8',
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
