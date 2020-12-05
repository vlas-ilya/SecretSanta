import './styles.scss';

import React, { ReactNode } from 'react';

import classNames from 'classnames';

export interface ListProps {
  title: string;
  children: ReactNode;
  readonly?: boolean;
}

export default function List({ title, children, readonly }: ListProps) {
  return (
    <div className={classNames('list', { readonly: readonly })}>
      {title && <div className="list-title">{title}</div>}
      {children}
    </div>
  );
}
