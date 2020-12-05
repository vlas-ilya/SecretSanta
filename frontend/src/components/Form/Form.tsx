import './styles.scss';

import React, { ReactNode } from 'react';

import classNames from 'classnames';

export type FormProps = {
  className?: string;
  children: ReactNode;
};

export const Form = (props: FormProps) => (
  <div className={classNames('form', props.className)}>{props.children}</div>
);
