import classNames from 'classnames';
import React, { createContext, useContext } from 'react';

type CardVariant = 'solid';

const CardContext = createContext<{
  variant?: CardVariant;
}>({});

const useVariant = () => {
  return useContext(CardContext).variant;
};

export interface CardHeadingProps {
  children: React.ReactNode;
}

const Heading = (props: CardHeadingProps) => {
  const { children } = props;
  const variant = useVariant();
  const className = classNames(variant === 'solid' && ['mb-2']);

  return <header className={className}>{children}</header>;
};

export interface CardBodyProps {
  children: React.ReactNode;
}

const Body = (props: CardBodyProps) => {
  const { children } = props;
  return <div>{children}</div>;
};

export interface CardProps {
  variant: CardVariant;
  className?: string;
  children: React.ReactNode;
}

export const Card = (props: CardProps) => {
  const { variant, children, className } = props;

  return (
    <CardContext.Provider value={{ variant }}>
      <section
        className={classNames(
          'rounded',
          'p-4',
          'shadow-md',
          variant === 'solid' && ['bg-gray-300'],
          className,
        )}
      >
        {children}
      </section>
    </CardContext.Provider>
  );
};

Card.Heading = Heading;
Card.Body = Body;
