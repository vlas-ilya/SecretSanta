import './styles.scss';

import React, { ReactNode, UIEventHandler } from 'react';

import classNames from 'classnames';

export interface PageProps {
  className?: string;
  loading?: boolean;
  onScroll?: UIEventHandler;
  children: ReactNode;
  width?: number;
}

export default function Page({ children, className, loading, onScroll, width }: PageProps) {
  return (
    <div className={classNames(className, 'page', { loading })}>
      <div className="page-wrapper" onScroll={onScroll}>
        <div className="content-wrapper" style={width ? { maxWidth: width + 'px' } : {}}>
          {children}
        </div>
      </div>
    </div>
  );
}
