import './styles.scss';

import React, { ReactNode } from 'react';

import { bem } from '../../utils/bem';

const list = bem('List');

/// List
export type ListProps = {
  title: string;
  children: ReactNode;
  readonly?: boolean;
};

export const List = ({ title, readonly, children }: ListProps) => (
  <div className={list({ readonly })}>
    {title && <div className={list.element('Title')}>{title}</div>}
    {children}
  </div>
);

/// ListItem
export type ListItemProps = {
  children: ReactNode;
  selected?: boolean;
};

export const ListItem = ({ children, selected }: ListItemProps) => (
  <div className={list.element('Item', { selected })}>{children}</div>
);

/// ListItemAction
export type ListItemActionProps = {
  title: string;
  action: () => void;
};

export const ListItemAction = ({ title, action }: ListItemActionProps) => (
  <div className={list.element('ItemAction')} role="button" onClick={action}>
    {title}
  </div>
);
