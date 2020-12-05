import './styles.scss';

import React, { ReactNode } from 'react';

import classNames from 'classnames';

export type ListProps = {
  title: string;
  children: ReactNode;
  readonly?: boolean;
};

export const List = (props: ListProps) => (
  <div className={classNames('list', { readonly: props.readonly })}>
    {props.title && <div className="list-title">{props.title}</div>}
    {props.children}
  </div>
);
