import React, { ReactNode } from 'react';

import classNames from 'classnames';

export type ListItemProps = {
  children: ReactNode;
  actions?: ReactNode[];
  className?: string;
};

export const ListItem = (props: ListItemProps) => (
  <div className={classNames('list-item', props.className)}>
    {props.children}
    {props.actions}
  </div>
);
