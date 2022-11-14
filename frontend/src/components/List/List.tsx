import './List.styles.scss';

import React, { ReactNode, useCallback } from 'react';

import { bem } from '../../utils/bem';

const list = bem('List');

/// List
export type ListProps = {
  title: string;
  children: ReactNode;
  readonly?: boolean;
  fixed?: boolean
};

export const List = ({ title, readonly, fixed, children }: ListProps) => (
  <div className={list({ readonly, fixed })}>
    {title && <div className={list.element('Title')}>{title}</div>}
    {children}
  </div>
);

/// ListItem
export type ListItemProps = {
  children: ReactNode;
  selected?: boolean;
  onClick?: () => void;
};

export const ListItem = ({ children, selected, onClick }: ListItemProps) => (
  <div className={list.element('Item', { selected })} onClick={onClick}>
    {children}
  </div>
);

/// ListItemAction
export type ListItemActionProps = {
  title: string;
  action: () => void;
};

export const ListItemAction = ({ title, action }: ListItemActionProps) => {
  const onClickCallback = useCallback(
    (e) => {
      e.preventDefault();
      e.stopPropagation();
      action();
    },
    [action],
  );

  return (
    <div className={list.element('ItemAction')} role="button" onClick={onClickCallback}>
      {title}
    </div>
  );
};
