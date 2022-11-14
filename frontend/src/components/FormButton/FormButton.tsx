import './FormButton.styles.scss';

import React, { MouseEventHandler, ReactNode } from 'react';

import classNames from 'classnames';

export type FormButtonProps = {
  onClick: MouseEventHandler;
  children: ReactNode;
  className?: string;
  classNameContainer?: string;
};

export const FormButton = (props: FormButtonProps) => (
  <div className={classNames('form-button', props.classNameContainer)}>
    <button onClick={props.onClick} className={props.className}>
      {props.children}
    </button>
  </div>
);
