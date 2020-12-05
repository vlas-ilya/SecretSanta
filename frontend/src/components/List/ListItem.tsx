import React, { ReactNode } from 'react';
import classNames from 'classnames';

export interface ListItemProps {
  children: ReactNode;
  className?: string;
}

export default function ListItem({ children, className }: ListItemProps) {
  return (
    <div className={classNames('list-item', className)}>
      {children}
    </div>
  );
}
