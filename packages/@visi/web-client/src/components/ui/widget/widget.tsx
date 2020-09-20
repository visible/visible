import classNames from 'classnames';
import React, { createContext, useContext } from 'react';

const WidgetContext = createContext<{
  labelId?: string;
}>({});

const useLabelId = () => {
  return useContext(WidgetContext).labelId;
};

export interface TitleProps {
  children: React.ReactNode;
}

const Title = (props: TitleProps) => {
  const { children } = props;
  const id = useLabelId();

  return <div id={id}>{children}</div>;
};

export interface BodyProps {
  children: React.ReactNode;
}

const Body = (props: BodyProps) => {
  const { children } = props;

  return <div className={classNames('py-2')}>{children}</div>;
};

export interface WidgetProps {
  id: string;
  children: React.ReactNode;
}

export const Widget = (props: WidgetProps) => {
  const { children, id } = props;

  return (
    <WidgetContext.Provider value={{ labelId: id }}>
      <div
        role="region"
        aria-labelledby={id}
        className={classNames('mt-8', 'first:mt-0')}
      >
        {children}
      </div>
    </WidgetContext.Provider>
  );
};

Widget.Title = Title;
Widget.Body = Body;
