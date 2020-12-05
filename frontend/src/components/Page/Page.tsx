import './styles.scss';

import React, { ReactNode, UIEventHandler } from 'react';

import classNames from 'classnames';

export type PageProps = {
  className?: string;
  loading?: boolean;
  onScroll?: UIEventHandler;
  children?: ReactNode;
  width?: number;
};

export const Page = (props: PageProps) => (
  <div className={classNames(props.className, 'page', { loading: props.loading })}>
    <div className="page-wrapper" onScroll={props.onScroll}>
      <div className="content-wrapper" style={props.width ? { maxWidth: props.width + 'px' } : {}}>
        {props.children}
      </div>
    </div>
  </div>
);
