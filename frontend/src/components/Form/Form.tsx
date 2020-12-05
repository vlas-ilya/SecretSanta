import './styles.scss';

import React, { ReactNode } from 'react';

import classNames from 'classnames';

export interface FormProps {
  className?: string;
  children: ReactNode;
}

export default function Form({ children, className }: FormProps) {
  return <div className={classNames('form', className)}>{children}</div>;
}
